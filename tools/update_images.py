import os
import json
import requests
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from typing import Dict, List, Optional
from urllib.parse import urlparse
import hashlib

class ImageUpdater:
    def __init__(self):
        self.unsplash_api_key = "OQWrVddFMcJWnwxkKoVNoclCPTN0OoULvl0q2gF3-8w"  # Unsplash Access Key
        self.base_url = "https://api.unsplash.com"
        self.checked_urls = set()
        self.updated_count = 0
        self.failed_count = 0
        self.images_dir = Path(__file__).parent.parent / 'images'
        self.ensure_image_dir()

    def ensure_image_dir(self):
        """确保images目录存在"""
        if not self.images_dir.exists():
            self.images_dir.mkdir(parents=True)
            print(f"创建图片目录: {self.images_dir}")

    def get_image_filename(self, url: str, keyword: str) -> str:
        """生成图片文件名"""
        # 使用URL的MD5和关键词组合作为文件名
        url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
        safe_keyword = "".join(x for x in keyword if x.isalnum() or x in (' ', '-', '_')).strip()
        safe_keyword = safe_keyword.replace(' ', '_')
        return f"{safe_keyword}_{url_hash}.jpg"

    def download_image(self, url: str, keyword: str) -> Optional[str]:
        """下载图片到本地"""
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                filename = self.get_image_filename(url, keyword)
                image_path = self.images_dir / filename
                
                with open(image_path, 'wb') as f:
                    f.write(response.content)
                
                # 返回相对路径
                return f"images/{filename}"
            return None
        except Exception as e:
            print(f"下载图片失败: {url} - {str(e)}")
            return None

    def check_image_url(self, url: str) -> bool:
        """检查图片URL是否可访问"""
        if not url or not isinstance(url, str):
            return False

        # 如果是本地文件，检查文件是否存在
        if url.startswith('images/'):
            return (self.images_dir.parent / url).exists()

        if url in self.checked_urls:
            return True

        try:
            response = requests.head(url, timeout=5)
            self.checked_urls.add(url)
            return response.status_code == 200
        except:
            return False

    def search_unsplash_image(self, keyword: str) -> Optional[str]:
        """通过Unsplash API搜索图片"""
        if not self.unsplash_api_key:
            print("请先设置Unsplash API key")
            return None

        try:
            headers = {"Authorization": f"Client-ID {self.unsplash_api_key}"}
            params = {
                "query": keyword,
                "per_page": 1,
                "orientation": "landscape"
            }
            response = requests.get(
                f"{self.base_url}/search/photos",
                headers=headers,
                params=params
            )
            
            if response.status_code == 200:
                data = response.json()
                if data["results"]:
                    return f"{data['results'][0]['urls']['raw']}&w=400"
            return None
        except Exception as e:
            print(f"搜索图片失败: {keyword} - {str(e)}")
            return None

    def update_word_image(self, word: Dict) -> Dict:
        """更新单个单词的图片URL, 如果本地图片已存在则跳过"""
        current_url = word.get("image") or word.get("imageUrl")
        keyword = word.get("word") or word.get("english") or word.get("chinese")

        # 1. Check if current_url points to an existing local file
        is_local = current_url and current_url.startswith('images/')
        local_file_path = self.images_dir.parent / current_url if is_local else None
        local_file_exists = is_local and local_file_path.exists()

        if local_file_exists:
            # Already have a valid local image, ensure the key is 'imageUrl'
            if "image" in word:
                 word["imageUrl"] = word.pop("image")
            # print(f"ℹ️ Skipping {keyword}, local image exists: {current_url}") # Optional: uncomment for verbose logging
            return word # Skip further processing

        # 2. If no valid local image, try fetching/downloading
        # print(f"🔍 Checking/Updating image for: {keyword}") # Optional: uncomment for verbose logging
        new_url = self.search_unsplash_image(keyword)

        if new_url:
            local_path = self.download_image(new_url, keyword)
            if local_path:
                # Update the word dict with the new local path
                word["imageUrl"] = local_path
                if "image" in word: # Remove old key if exists
                    word.pop("image")
                self.updated_count += 1
                print(f"✅ Downloaded and updated image: {keyword} -> {local_path}")
            else: # Download failed
                self.failed_count += 1
                print(f"❌ Download failed: {keyword}")
                # Clear the URL if download fails
                word["imageUrl"] = ""
                if "image" in word: word.pop("image")
        else: # Unsplash search failed
            self.failed_count += 1
            print(f"❌ Unsplash search failed: {keyword}")
            # Clear the URL if search fails
            word["imageUrl"] = ""
            if "image" in word: word.pop("image")

        return word

    def update_file(self, file_path: str):
        """更新JSON文件中的所有图片URL"""
        try:
            if not os.path.exists(file_path):
                print(f"文件不存在: {file_path}")
                return

            with open(file_path, 'r', encoding='utf-8') as f:
                words = json.load(f)

            if not isinstance(words, list):
                print(f"文件格式错误: {file_path} - 预期是数组格式")
                return

            print(f"\n正在更新文件: {os.path.basename(file_path)}")
            print('----------------------------------------')

            # 使用线程池并行处理
            with ThreadPoolExecutor(max_workers=5) as executor:
                updated_words = list(executor.map(self.update_word_image, words))

            # 保存更新后的文件
            backup_path = file_path + '.backup'
            # Check if backup exists and remove it first to avoid error
            if os.path.exists(backup_path):
                os.remove(backup_path)
            os.rename(file_path, backup_path) # Now rename the original to backup
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(updated_words, f, ensure_ascii=False, indent=2) # Write the updated data back to the original file path

            print(f"\n文件已更新: {file_path}")
            print(f"原文件已备份为: {backup_path}")

        except Exception as e:
            print(f"处理文件失败: {file_path}", e)

    def main(self):
        """主函数"""
        data_dir = Path(__file__).parent.parent / 'data'
        
        if not data_dir.exists():
            print(f"数据目录不存在: {data_dir}")
            return

        files = [
            'animals.json',
            'basic_words.json',
            'body_parts.json',
            'family.json',
            'food.json',
            'nature.json',
            'numbers_colors.json',
            'grade_3.json'  # Add the new file here
        ]

        print('开始更新图片URL并下载图片到本地...\n')

        for file in files:
            self.update_file(str(data_dir / file))

        print('\n更新结果汇总:')
        print('----------------------------------------')
        print(f'总计更新: {self.updated_count}')
        print(f'更新失败: {self.failed_count}')

if __name__ == '__main__':
    updater = ImageUpdater()
    updater.main()
