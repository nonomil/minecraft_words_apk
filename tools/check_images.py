import os
import json
import requests
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse

class ImageChecker:
    def __init__(self):
        self.checked_urls = set()
        self.accessible_count = 0
        self.failed_count = 0
        self.timeout = 5  # 5秒超时

    def check_image_url(self, url):
        """检查单个图片URL是否可访问"""
        if not url or not isinstance(url, str):
            print(f'❌ 无效的URL: {url}')
            self.failed_count += 1
            return

        if url in self.checked_urls:
            return

        try:
            response = requests.head(url, timeout=self.timeout)
            self.checked_urls.add(url)
            
            if response.status_code == 200:
                print(f'✅ 可访问: {url}')
                self.accessible_count += 1
            else:
                print(f'❌ 访问失败 ({response.status_code}): {url}')
                self.failed_count += 1
        except requests.exceptions.RequestException as e:
            self.checked_urls.add(url)
            print(f'❌ 访问错误: {url} - {str(e)}')
            self.failed_count += 1

    def check_images_in_file(self, file_path):
        """检查JSON文件中的所有图片URL"""
        try:
            if not os.path.exists(file_path):
                print(f'文件不存在: {file_path}')
                return

            with open(file_path, 'r', encoding='utf-8') as f:
                words = json.load(f)

            if not isinstance(words, list):
                print(f'文件格式错误: {file_path} - 预期是数组格式')
                return

            print(f'\n正在检查文件: {os.path.basename(file_path)}')
            print('----------------------------------------')

            # 使用线程池并行检查URL
            with ThreadPoolExecutor(max_workers=10) as executor:
                for word in words:
                    if 'image' in word or 'imageUrl' in word:
                        url = word.get('image') or word.get('imageUrl')
                        executor.submit(self.check_image_url, url)
                    else:
                        print(f'⚠️ 缺少图片URL: {json.dumps(word, ensure_ascii=False)}')

        except json.JSONDecodeError as e:
            print(f'JSON解析失败: {file_path}', e)
        except Exception as e:
            print(f'处理文件失败: {file_path}', e)

    def main(self):
        """主函数"""
        data_dir = Path(__file__).parent.parent / 'data'
        
        if not data_dir.exists():
            print(f'数据目录不存在: {data_dir}')
            return

        files = [
            'animals.json',
            'basic_words.json',
            'body_parts.json',
            'family.json',
            'food.json',
            'nature.json',
            'numbers_colors.json'
        ]

        print('开始检查图片URL...\n')

        for file in files:
            self.check_images_in_file(data_dir / file)

        print('\n检查结果汇总:')
        print('----------------------------------------')
        print(f'总计检查URL: {len(self.checked_urls)}')
        print(f'可访问: {self.accessible_count}')
        print(f'失败: {self.failed_count}')

if __name__ == '__main__':
    checker = ImageChecker()
    checker.main() 