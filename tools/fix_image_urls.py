import json
import requests
import time
import random
from urllib.parse import urlparse

class ImageURLFixer:
    def __init__(self):
        # Unsplash API keys (multiple keys for rotation)
        self.unsplash_keys = [
            "OQWrVddFMcJWnwxkKoVNoclCPTN0OoULvl0q2gF3-8w",
            "sVtmkPbFb-f1DxU34URucaqmSJYMnsoqIpvK69YJ7N0",
            "42XDjC5FJ6LcQGHo8ORP9Z9hf49LkS2LuezeMw24SGI",
            "urolbFWYFPT-sg3eIDjvTU_GfgsxJ-Wk7c8B6TdkXJ8",
            "JOOb2pwq065i9AfIl7R_PJx86sla0mKqQd9_MEWVnmw",
            "ylm17hnMTzgwcN0AQEHckNkoCJhpIBjt5jpkHLMzf9Q",
            "ICoJ4CpQK-aMubDb-mZ7jnAX5vbaKbQtI8XVOqEBwn8",
            "aJjcGskMjvZ9d-kmhrtm4eLpNTHyKU-lt5kGvYLzrkw",
            "YBvyFEb2SW696tJsqP_J30QYw-gAq1zWSGLUvB1uwBM",
            "c5FZ3DlaIuIS8RbvTxWw87_CuJJI4sVbl3hxaoZ2p4k"
        ]
        self.current_key_index = 0
        self.checked_urls = set()
        self.updated_count = 0
        self.failed_count = 0
        self.valid_count = 0

    def get_current_unsplash_key(self):
        """Get current Unsplash API key and rotate to next"""
        key = self.unsplash_keys[self.current_key_index]
        self.current_key_index = (self.current_key_index + 1) % len(self.unsplash_keys)
        return key

    def check_url_validity(self, url):
        """Check if URL is valid and accessible"""
        if not url or not isinstance(url, str):
            return False
        
        if url in self.checked_urls:
            return True
        
        try:
            response = requests.head(url, timeout=10, allow_redirects=True)
            is_valid = response.status_code == 200
            if is_valid:
                self.checked_urls.add(url)
            return is_valid
        except:
            return False

    def get_unsplash_image(self, keyword):
        """Get image from Unsplash API"""
        try:
            api_key = self.get_current_unsplash_key()
            headers = {"Authorization": f"Client-ID {api_key}"}
            params = {
                "query": keyword,
                "per_page": 1,
                "orientation": "landscape",
                "content_filter": "high"
            }
            
            response = requests.get(
                "https://api.unsplash.com/search/photos",
                headers=headers,
                params=params,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data["results"]:
                    return f"{data['results'][0]['urls']['regular']}?w=400&q=80&auto=format&fit=crop"
            return None
        except Exception as e:
            print(f"  Unsplash API error for '{keyword}': {str(e)}")
            return None

    def get_icons8_image(self, keyword):
        """Get image from Icons8"""
        # Icons8 common patterns
        icons8_patterns = [
            f"https://img.icons8.com/color/48/{keyword.lower().replace(' ', '-')}.png",
            f"https://img.icons8.com/fluency/48/{keyword.lower().replace(' ', '-')}.png",
            f"https://img.icons8.com/color/96/{keyword.lower().replace(' ', '-')}.png",
            f"https://img.icons8.com/emoji/48/{keyword.lower().replace(' ', '-')}-emoji.png"
        ]
        
        for pattern in icons8_patterns:
            if self.check_url_validity(pattern):
                return pattern
        return None

    def get_alternative_image_sources(self, keyword):
        """Get alternative image sources"""
        alternatives = [
            # Pixabay
            f"https://cdn.pixabay.com/photo/2020/01/01/12/00/{keyword.lower().replace(' ', '-')}-4736364_640.jpg",
            # Pexels
            f"https://images.pexels.com/photos/1000000/pexels-photo-1000000.jpeg?auto=compress&cs=tinysrgb&w=400",
            # Generic placeholder
            f"https://via.placeholder.com/400x300/4CAF50/FFFFFF?text={keyword.replace(' ', '+')}",
            # Lorem Picsum with seed
            f"https://picsum.photos/seed/{keyword.replace(' ', '')}/400/300"
        ]
        
        return alternatives

    def get_replacement_image_url(self, word):
        """Get replacement image URL using multiple sources"""
        keyword = word.lower().strip()
        
        # 1. Try Unsplash API first
        unsplash_url = self.get_unsplash_image(keyword)
        if unsplash_url and self.check_url_validity(unsplash_url):
            return unsplash_url
        
        # 2. Try Icons8
        icons8_url = self.get_icons8_image(keyword)
        if icons8_url:
            return icons8_url
        
        # 3. Try alternative sources
        alternatives = self.get_alternative_image_sources(keyword)
        for alt_url in alternatives:
            if self.check_url_validity(alt_url):
                return alt_url
        
        # 4. Fallback to a working placeholder
        return f"https://via.placeholder.com/400x300/2196F3/FFFFFF?text={keyword.replace(' ', '+')}"

    def fix_image_urls_in_file(self, file_path):
        """Fix image URLs in JSON file"""
        print(f"\nProcessing {file_path}...")
        print("-" * 50)
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if not isinstance(data, list):
                print(f"Error: {file_path} is not a JSON array")
                return
            
            file_updated = 0
            file_valid = 0
            file_failed = 0
            
            for i, word_entry in enumerate(data):
                word = word_entry.get('word', word_entry.get('english', f'word_{i}'))
                
                # Handle different URL structures
                urls_to_check = []
                
                # Check imageURLs array
                if 'imageURLs' in word_entry and isinstance(word_entry['imageURLs'], list):
                    for img_obj in word_entry['imageURLs']:
                        if isinstance(img_obj, dict) and 'url' in img_obj:
                            urls_to_check.append(('imageURLs', img_obj))
                
                # Check direct url field
                if 'url' in word_entry:
                    urls_to_check.append(('url', word_entry))
                
                # Check imageUrl field
                if 'imageUrl' in word_entry:
                    urls_to_check.append(('imageUrl', word_entry))
                
                for url_type, obj in urls_to_check:
                    if url_type == 'imageURLs':
                        current_url = obj['url']
                    else:
                        current_url = obj[url_type]
                    
                    print(f"Checking '{word}': {current_url[:60]}...")
                    
                    if self.check_url_validity(current_url):
                        print(f"  ? URL is valid")
                        file_valid += 1
                        self.valid_count += 1
                    else:
                        print(f"  ? Invalid URL, searching replacement...")
                        new_url = self.get_replacement_image_url(word)
                        
                        if url_type == 'imageURLs':
                            obj['url'] = new_url
                        else:
                            obj[url_type] = new_url
                        
                        print(f"  ? Replaced with: {new_url[:60]}...")
                        file_updated += 1
                        self.updated_count += 1
                        
                        # Immediately save the updated file
                        with open(file_path, 'w', encoding='utf-8') as f:
                            json.dump(data, f, ensure_ascii=False, indent=2)
                        print(f"  ? File updated immediately")
                        
                        # Rate limiting
                        time.sleep(0.5)
            
            # Save backup file
            backup_path = file_path.replace('.json', '_backup.json')
            with open(backup_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            print(f"\nFile results:")
            print(f"  Valid URLs: {file_valid}")
            print(f"  Updated URLs: {file_updated}")
            print(f"  Backup saved: {backup_path}")
            
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
            self.failed_count += 1

    def main(self):
        """Main function to fix image URLs"""
        files_to_fix = [
            'kindergarten_basic_all.json',
            'kindergarten_learning_all.json',
            'kindergarten_nature_all.json'
        ]
        
        print("? Starting comprehensive image URL validation and fixing...")
        print("=" * 60)
        print(f"Using {len(self.unsplash_keys)} Unsplash API keys")
        print("Supported sources: Unsplash API, Icons8, Pixabay, Pexels, Placeholders")
        print("=" * 60)
        
        for file_path in files_to_fix:
            try:
                self.fix_image_urls_in_file(file_path)
            except Exception as e:
                print(f"Failed to process {file_path}: {e}")
        
        print("\n" + "=" * 60)
        print("? Image URL fixing completed!")
        print(f"? Summary:")
        print(f"  ? Valid URLs: {self.valid_count}")
        print(f"  ? Updated URLs: {self.updated_count}")
        print(f"  ? Failed: {self.failed_count}")
        
        if self.valid_count + self.updated_count > 0:
            success_rate = (self.valid_count / (self.valid_count + self.updated_count)) * 100
            print(f"  ? Original success rate: {success_rate:.1f}%")

if __name__ == "__main__":
    fixer = ImageURLFixer()
    fixer.main()