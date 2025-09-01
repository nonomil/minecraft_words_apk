# -*- coding: utf-8 -*-
"""
Organize vocabulary from minecraft_image_links.json into basic/intermediate/advanced files.
Update Chinese translations and add missing phrases.
"""
import json
import os
import time
from typing import Dict, List, Optional, Set

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# File paths
IMAGE_LINKS_PATH = os.path.join(BASE_DIR, 'minecraft_image_links.json')
BASIC_PATH = os.path.join(BASE_DIR, 'minecraft_basic.json')
INTERMEDIATE_PATH = os.path.join(BASE_DIR, 'minecraft_intermediate.json')
ADVANCED_PATH = os.path.join(BASE_DIR, 'minecraft_advanced.json')

# Core translation mappings (using Unicode escapes)
WIKI_TRANSLATIONS = {
    'water': '\u6c34',  # Ë®
    'stone': '\u77f3\u5934',  # Ê¯Í·
    'dirt': '\u6ce5\u571f',  # ÄàÍÁ
    'grass': '\u8349\u65b9\u5757',  # ²Ý·½¿é
    'wood': '\u6728\u5934',  # Ä¾Í·
    'oak': '\u6a61\u6728',  # ÏðÄ¾
    'planks': '\u6728\u677f',  # Ä¾°å
    'leaves': '\u6811\u53f6',  # Ê÷Ò¶
    'sapling': '\u6811\u82d7',  # Ê÷Ãç
    'cobblestone': '\u5706\u77f3',  # Ô²Ê¯
    'bedrock': '\u57fa\u5ca9',  # »ùÑÒ
    'sand': '\u6c99\u5b50',  # É³×Ó
    'gravel': '\u6c99\u7802',  # É³Àù
    'coal': '\u7164\u70ad',  # ÃºÌ¿
    'iron': '\u94c1\u9320',  # Ìú¶§
    'gold': '\u91d1\u9320',  # ½ð¶§
    'diamond': '\u94bb\u77f3',  # ×êÊ¯
    'emerald': '\u7eff\u5b9d\u77f3',  # ÂÌ±¦Ê¯
    'redstone': '\u7ea2\u77f3\u7c89',  # ºìÊ¯·Û
    'lapis': '\u9752\u91d1\u77f3',  # Çà½ðÊ¯
    'quartz': '\u77f3\u82f1',  # Ê¯Ó¢
    'obsidian': '\u9ed1\u66dc\u77f3',  # ºÚê×Ê¯
    'glass': '\u73bb\u7483',  # ²£Á§
    'torch': '\u706b\u628a',  # »ð°Ñ
    'chest': '\u7bb1\u5b50',  # Ïä×Ó
    'furnace': '\u7194\u7089',  # ÈÛÂ¯
    'crafting table': '\u5de5\u4f5c\u53f0',  # ¹¤×÷Ì¨
    'bed': '\u5e8a',  # ´²
    'door': '\u95e8',  # ÃÅ
    'stairs': '\u697c\u68af',  # Â¥ÌÝ
    'slab': '\u53f0\u9636',  # Ì¨½×
    'fence': '\u6805\u680f',  # Õ¤À¸
    'gate': '\u6805\u680f\u95e8',  # Õ¤À¸ÃÅ
    'wool': '\u7f8a\u6bdb',  # ÑòÃ«
    'red': '\u7ea2\u8272',  # ºìÉ«
    'blue': '\u84dd\u8272',  # À¶É«
    'green': '\u7eff\u8272',  # ÂÌÉ«
    'yellow': '\u9ec4\u8272',  # »ÆÉ«
    'white': '\u767d\u8272',  # °×É«
    'black': '\u9ed1\u8272',  # ºÚÉ«
    'orange': '\u6a59\u8272',  # ³ÈÉ«
    'purple': '\u7d2b\u8272',  # ×ÏÉ«
    'pink': '\u7c89\u7ea2\u8272',  # ·ÛºìÉ«
    'gray': '\u7070\u8272',  # »ÒÉ«
    'brown': '\u68d5\u8272',  # ×ØÉ«
    'cyan': '\u9752\u8272',  # ÇàÉ«
    'lime': '\u9ec4\u7eff\u8272',  # »ÆÂÌÉ«
    'magenta': '\u54c1\u7ea2\u8272',  # Æ·ºìÉ«
    'light blue': '\u6de1\u84dd\u8272',  # µ­À¶É«
    'light gray': '\u6de1\u7070\u8272',  # µ­»ÒÉ«
    'apple': '\u82f9\u679c',  # Æ»¹û
    'bread': '\u9762\u5305',  # Ãæ°ü
    'wheat': '\u5c0f\u9ea6',  # Ð¡Âó
    'seeds': '\u79cd\u5b50',  # ÖÖ×Ó
    'pig': '\u732a',  # Öí
    'cow': '\u725b',  # Å£
    'sheep': '\u7ef5\u7f8a',  # ÃàÑò
    'chicken': '\u9e21',  # ¼¦
    'zombie': '\u50f5\u5c38',  # ½©Ê¬
    'skeleton': '\u9ab7\u9ac5',  # ÷¼÷Ã
    'creeper': '\u82e6\u529b\u6015',  # ¿àÁ¦ÅÂ
    'spider': '\u8718\u86db',  # Ö©Öë
    'enderman': '\u672b\u5f71\u4eba',  # Ä©Ó°ÈË
    'sword': '\u5251',  # ½£
    'pickaxe': '\u9550',  # ¸ä
    'axe': '\u65a7\u5b50',  # ¸«×Ó
    'shovel': '\u94f2\u5b50',  # ²ù×Ó
    'hoe': '\u9504\u5934',  # ³úÍ·
    'bow': '\u5f13',  # ¹­
    'arrow': '\u7bad',  # ¼ý
    'armor': '\u76d4\u7532',  # ¿ø¼×
    'helmet': '\u5934\u76d4',  # Í·¿ø
    'chestplate': '\u80f8\u7532',  # ÐØ¼×
    'leggings': '\u62a4\u817f',  # »¤ÍÈ
    'boots': '\u9774\u5b50',  # Ñ¥×Ó
    'shield': '\u76fe\u724c',  # ¶ÜÅÆ
    'bucket': '\u6876',  # Í°
    'milk': '\u725b\u5976',  # Å£ÄÌ
    'egg': '\u9e21\u86cb',  # ¼¦µ°
    'leather': '\u76ae\u9769',  # Æ¤¸ï
    'feather': '\u7fbd\u6bdb',  # ÓðÃ«
    'string': '\u7ebf',  # Ïß
    'flint': '\u71e7\u77f3',  # ìÝÊ¯
    'stick': '\u6728\u68cd',  # Ä¾¹÷
    'bowl': '\u7897',  # Íë
    'sugar': '\u7cd6',  # ÌÇ
    'paper': '\u7eb8',  # Ö½
    'book': '\u4e66',  # Êé
    'flower': '\u82b1',  # »¨
    'mushroom': '\u8611\u83c7',  # Ä¢¹½
    'cactus': '\u4ed9\u4eba\u638c',  # ÏÉÈËÕÆ
    'pumpkin': '\u5357\u74dc',  # ÄÏ¹Ï
    'melon': '\u897f\u74dc',  # Î÷¹Ï
    'carrot': '\u80e1\u841d\u535c',  # ºúÂÜ²·
    'potato': '\u9a6c\u94c3\u85af',  # ÂíÁåÊí
    'beetroot': '\u751c\u83dc\u6839',  # Ìð²Ë¸ù
    'nether': '\u4e0b\u754c',  # ÏÂ½ç
    'end': '\u672b\u5730',  # Ä©µØ
    'portal': '\u4f20\u9001\u95e8',  # ´«ËÍÃÅ
    'dragon': '\u672b\u5f71\u9f99',  # Ä©Ó°Áú
    'wither': '\u51cb\u96f6',  # µòÁã
    'elytra': '\u9798\u7fc5',  # ÇÊ³á
    'trident': '\u4e09\u53c9\u621f',  # Èý²æêª
    'crossbow': '\u5f29',  # åó
    'totem': '\u4e0d\u6b7b\u56fe\u817e',  # ²»ËÀÍ¼ÌÚ
    'beacon': '\u4fe1\u6807',  # ÐÅ±ê
    'anvil': '\u94c1\u7827',  # ÌúÕè
    'enchanting table': '\u9644\u9b54\u53f0',  # ¸½Ä§Ì¨
    'brewing stand': '\u917f\u9020\u53f0',  # ÄðÔìÌ¨
    'cauldron': '\u70bc\u836f\u9505',  # Á¶Ò©¹ø
    'dispenser': '\u53d1\u5c04\u5668',  # ·¢ÉäÆ÷
    'dropper': '\u6295\u63b7\u5668',  # Í¶ÖÀÆ÷
    'hopper': '\u6f0f\u6597',  # Â©¶·
    'piston': '\u6d3b\u585e',  # »îÈû
    'lever': '\u62c9\u6746',  # À­¸Ë
    'button': '\u6309\u94ae',  # °´Å¥
    'pressure plate': '\u538b\u529b\u677f',  # Ñ¹Á¦°å
    'trapdoor': '\u6d3b\u677f\u95e8',  # »î°åÃÅ
    'note block': '\u97f3\u7b26\u76d2',  # Òô·ûºÐ
    'jukebox': '\u5531\u7247\u673a',  # ³ªÆ¬»ú
    'rail': '\u94c1\u8f68',  # Ìú¹ì
    'minecart': '\u77ff\u8f66',  # ¿ó³µ
    'boat': '\u8239',  # ´¬
    'compass': '\u6307\u5357\u9488',  # Ö¸ÄÏÕë
    'clock': '\u65f6\u949f',  # Ê±ÖÓ
    'painting': '\u753b',  # »­
    'sign': '\u544a\u793a\u724c',  # ¸æÊ¾ÅÆ
    'ladder': '\u68af\u5b50',  # ÌÝ×Ó
    'snow': '\u96ea',  # Ñ©
    'ice': '\u51b0',  # ±ù
    'tnt': 'TNT',  # TNT
    'sponge': '\u6d77\u7ef5',  # º£Ãà
    'clay': '\u9ecf\u571f\u5757',  # ð¤ÍÁ¿é
    'brick': '\u7816\u5757',  # ×©¿é
    'sandstone': '\u7802\u5ca9',  # É°ÑÒ
    'granite': '\u82b1\u5c97\u5ca9',  # »¨¸ÚÑÒ
    'diorite': '\u95ea\u957f\u5ca9',  # ÉÁ³¤ÑÒ
    'andesite': '\u5b89\u5c71\u5ca9',  # °²É½ÑÒ
    'prismarine': '\u6d77\u6676\u77f3',  # º£¾§Ê¯
    'sea lantern': '\u6d77\u6676\u706f',  # º£¾§µÆ
    'magma block': '\u5ca9\u6d46\u5757',  # ÑÒ½¬¿é
    'netherrack': '\u4e0b\u754c\u5ca9',  # ÏÂ½çÑÒ
    'soul sand': '\u7075\u9b42\u6c99',  # Áé»êÉ³
    'glowstone': '\u8367\u77f3',  # Ó«Ê¯
    'end stone': '\u672b\u5730\u77f3',  # Ä©µØÊ¯
    'purpur block': '\u7d2b\u73c0\u5757',  # ×Ïçê¿é
    'chorus fruit': '\u7d2b\u9882\u679c',  # ×ÏËÌ¹û
    'shulker box': '\u6f5c\u5f71\u76d2',  # Ç±Ó°ºÐ
    'ender chest': '\u672b\u5f71\u7bb1',  # Ä©Ó°Ïä
    'spawner': '\u5237\u602a\u7b3c',  # Ë¢¹ÖÁý
    'cobweb': '\u8718\u86db\u7f51',  # Ö©ÖëÍø
    'vine': '\u85e4\u8513',  # ÌÙÂû
    'lily pad': '\u7761\u83b2',  # Ë¯Á«
    'kelp': '\u6d77\u5e26',  # º£´ø
    'bamboo': '\u7af9\u5b50',  # Öñ×Ó
    'honey block': '\u8702\u871c\u5757',  # ·äÃÛ¿é
    'honeycomb block': '\u871c\u813e\u5757',  # ÃÛÆ¢¿é
    'bee nest': '\u8702\u5de2',  # ·ä³²
    'beehive': '\u8702\u7bb1',  # ·äÏä
    'copper': '\u94dc\u5757',  # Í­¿é
    'amethyst': '\u7d2b\u6c34\u6676\u5757',  # ×ÏË®¾§¿é
    'deepslate': '\u6df1\u677f\u5ca9',  # Éî°åÑÒ
    'dripstone': '\u6ef4\u6c34\u77f3\u5757',  # µÎË®Ê¯¿é
    'moss block': '\u82d4\u85d3\u5757',  # Ì¦Þº¿é
    'azalea': '\u675c\u9e43\u82b1\u4e1b',  # ¶Å¾é»¨´Ô
    'spore blossom': '\u5b62\u5b50\u82b1',  # æß×Ó»¨
    'glow lichen': '\u53d1\u5149\u5730\u8863',  # ·¢¹âµØÒÂ
    'sculk': '\u5e7d\u5321\u5757',  # ÓÄÄä¿é
    'sculk sensor': '\u5e7d\u5321\u611f\u6d4b\u4f53',  # ÓÄÄä¸Ð²âÌå
    'sculk catalyst': '\u5e7d\u5321\u50ac\u53d1\u4f53',  # ÓÄÄä´ß·¢Ìå
    'sculk shrieker': '\u5e7d\u5321\u5c16\u5578\u4f53',  # ÓÄÄä¼âÐ¥Ìå
    'warden': '\u76d1\u5b88\u8005',  # ¼àÊØÕß
    'mangrove': '\u7ea2\u6811',  # ºìÊ÷
    'mud': '\u6ce5\u5df4',  # Äà°Í
    'frog': '\u9752\u86d9',  # ÇàÍÜ
    'tadpole': '\u8713\u86aa',  # òòò½
    'allay': '\u6096\u7075',  # ÔÃÁé
    'goat': '\u5c71\u7f8a',  # É½Ñò
    'axolotl': '\u7f8e\u897f\u87b5',  # ÃÀÎ÷ó¢
    'glow squid': '\u53d1\u5149\u9c7f\u9c7c',  # ·¢¹âöÏÓã
    'powder snow': '\u7ec6\u96ea',  # Ï¸Ñ©
    'spyglass': '\u671b\u8fdc\u955c',  # ÍûÔ¶¾µ
    'bundle': '\u6536\u7eb3\u888b',  # ÊÕÄÉ´ü
    'candle': '\u8721\u70db',  # À¯Öò
    'lightning rod': '\u907f\u96f7\u9488',  # ±ÜÀ×Õë
    'respawn anchor': '\u91cd\u751f\u9524',  # ÖØÉúÃª
    'lodestone': '\u78c1\u77f3',  # ´ÅÊ¯
    'crying obsidian': '\u54ed\u6ce3\u7684\u9ed1\u66dc\u77f3',  # ¿ÞÆüµÄºÚê×Ê¯
    'blackstone': '\u9ed1\u77f3',  # ºÚÊ¯
    'basalt': '\u7384\u6b66\u5ca9',  # ÐþÎäÑÒ
    'soul soil': '\u7075\u9b42\u571f',  # Áé»êÍÁ
    'soul torch': '\u7075\u9b42\u706b\u628a',  # Áé»ê»ð°Ñ
    'soul lantern': '\u7075\u9b42\u706f\u7b3c',  # Áé»êµÆÁý
    'soul campfire': '\u7075\u9b42\u8425\u706b',  # Áé»êÓª»ð
    'crimson': '\u7eef\u7ea2',  # ç³ºì
    'warped': '\u8be1\u5f02',  # ¹îÒì
    'nylium': '\u83cc\u5ca9',  # ¾úÑÒ
    'fungus': '\u83cc',  # ¾ú
    'roots': '\u83cc\u7d22',  # ¾úË÷
    'stem': '\u83cc\u67c4',  # ¾ú±ú
    'hyphae': '\u83cc\u6838',  # ¾úºË
    'shroomlight': '\u83cc\u5149\u4f53',  # ¾ú¹âÌå
    'weeping vines': '\u5782\u6cea\u85e4',  # ´¹ÀáÌÙ
    'twisting vines': '\u7f20\u6028\u85e4',  # ²øÔ¹ÌÙ
    'nether sprouts': '\u4e0b\u754c\u82d7',  # ÏÂ½çÃç
    'nether wart': '\u4e0b\u754c\u75a3',  # ÏÂ½çðà
    'piglin': '\u732a\u7075',  # ÖíÁé
    'hoglin': '\u75a3\u732a\u517d',  # ðàÖíÊÞ
    'strider': '\u7092\u8db3\u517d',  # ³ã×ãÊÞ
    'zoglin': '\u50f5\u5c38\u75a3\u732a\u517d',  # ½©Ê¬ðàÖíÊÞ
    'netherite': '\u4e0b\u754c\u5408\u91d1',  # ÏÂ½çºÏ½ð
    'ancient debris': '\u8fdc\u53e4\u6b8b\u9ab8',  # Ô¶¹Å²Ðº¡
    'target': '\u6807\u9776',  # ±ê°Ð
    'smithing table': '\u953b\u9020\u53f0',  # ¶ÍÔìÌ¨
    'fletching table': '\u5236\u7bad\u53f0',  # ÖÆ¼ýÌ¨
    'cartography table': '\u5236\u56fe\u53f0',  # ÖÆÍ¼Ì¨
    'grindstone': '\u7802\u8f6e',  # É°ÂÖ
    'stonecutter': '\u5207\u77f3\u673a',  # ÇÐÊ¯»ú
    'loom': '\u7ec7\u5e03\u673a',  # Ö¯²¼»ú
    'composter': '\u5806\u80a5\u7bb1',  # ¶Ñ·ÊÏä
    'barrel': '\u6728\u6876',  # Ä¾Í°
    'smoker': '\u70df\u718f\u7089',  # ÑÌÑ¬Â¯
    'blast furnace': '\u9ad8\u7089',  # ¸ßÂ¯
    'campfire': '\u8425\u706b',  # Óª»ð
    'lantern': '\u706f\u7b3c',  # µÆÁý
    'bell': '\u949f',  # ÖÓ
    'scaffolding': '\u811a\u624b\u67b6',  # ½ÅÊÖ¼Ü
    'lectern': '\u8bb2\u53f0',  # ½²Ì¨
    'conduit': '\u6f6e\u6d8c\u6838\u5fc3',  # ³±Ó¿ºËÐÄ
    'turtle egg': '\u6d77\u9f9f\u86cb',  # º£¹êµ°
    'scute': '\u9cde\u7532',  # ÁÛ¼×
    'phantom membrane': '\u5e7b\u7fc5\u819c',  # »ÃÒíÄ¤
    'nautilus shell': '\u9e66\u9e49\u87ba\u58f3',  # ðÐðÄÂÝ¿Ç
    'heart of the sea': '\u6d77\u6d0b\u4e4b\u5fc3',  # º£ÑóÖ®ÐÄ
    'dragon breath': '\u9f99\u606f',  # ÁúÏ¢
    'nether star': '\u4e0b\u754c\u4e4b\u661f',  # ÏÂ½çÖ®ÐÇ
    'end crystal': '\u672b\u5f71\u6c34\u6676',  # Ä©Ó°Ë®¾§
    'enchanted golden apple': '\u9644\u9b54\u91d1\u82f9\u679c',  # ¸½Ä§½ðÆ»¹û
    'golden apple': '\u91d1\u82f9\u679c',  # ½ðÆ»¹û
    'golden carrot': '\u91d1\u80e1\u841d\u535c',  # ½ðºúÂÜ²·
    'glistering melon slice': '\u95ea\u70c1\u7684\u897f\u74dc\u7247',  # ÉÁË¸µÄÎ÷¹ÏÆ¬
    'honey bottle': '\u8702\u871c\u74f6',  # ·äÃÛÆ¿
    'suspicious stew': '\u8ff7\u4e4b\u7092\u83dc',  # ÃÔÖ®³´²Ë
    'sweet berries': '\u751c\u6d46\u679c',  # Ìð½¬¹û
    'glow berries': '\u53d1\u5149\u6d46\u679c',  # ·¢¹â½¬¹û
    'dried kelp': '\u5e72\u6d77\u5e26',  # ¸Éº£´ø
    'potion': '\u836f\u6c34',  # Ò©Ë®
    'splash potion': '\u55b7\u6e85\u836f\u6c34',  # Åç½¦Ò©Ë®
    'lingering potion': '\u6ede\u7559\u836f\u6c34',  # ÖÍÁôÒ©Ë®
    'tipped arrow': '\u836f\u7bad',  # Ò©¼ý
    'spectral arrow': '\u5149\u7075\u7bad',  # ¹âÁé¼ý
    'firework rocket': '\u70df\u82b1\u706b\u7bad',  # ÑÌ»¨»ð¼ý
    'firework star': '\u70df\u82b1\u4e4b\u661f',  # ÑÌ»¨Ö®ÐÇ
    'item frame': '\u7269\u54c1\u5c55\u793a\u6846',  # ÎïÆ·Õ¹Ê¾¿ò
    'glow item frame': '\u53d1\u5149\u7269\u54c1\u5c55\u793a\u6846',  # ·¢¹âÎïÆ·Õ¹Ê¾¿ò
    'lead': '\u62f4\u7ef3',  # Ë©Éþ
    'name tag': '\u547d\u540d\u724c',  # ÃüÃûÅÆ
    'saddle': '\u978d',  # °°
    'horse armor': '\u9a6c\u94e0',  # Âíîø
    'music disc': '\u97f3\u4e50\u5531\u7247',  # ÒôÀÖ³ªÆ¬
    'banner': '\u65d7\u5e1c',  # ÆìÖÄ
    'banner pattern': '\u65d7\u5e1c\u56fe\u6848',  # ÆìÖÄÍ¼°¸
    'dye': '\u67d3\u6599',  # È¾ÁÏ
    'ink sac': '\u58a8\u56ca',  # Ä«ÄÒ
    'glow ink sac': '\u53d1\u5149\u58a8\u56ca',  # ·¢¹âÄ«ÄÒ
    'bone': '\u9aa8\u5934',  # ¹ÇÍ·
    'bone meal': '\u9aa8\u7c89',  # ¹Ç·Û
    'gunpowder': '\u706b\u836f',  # »ðÒ©
    'blaze powder': '\u70c8\u7130\u7c89',  # ÁÒÑæ·Û
    'blaze rod': '\u70c8\u7130\u68d2',  # ÁÒÑæ°ô
    'ender pearl': '\u672b\u5f71\u73cd\u73e0',  # Ä©Ó°ÕäÖé
    'eye of ender': '\u672b\u5f71\u4e4b\u773c',  # Ä©Ó°Ö®ÑÛ
    'ghast tear': '\u6076\u9b42\u6cea',  # ¶ñ»êÀá
    'magma cream': '\u5ca9\u6d46\u818f',  # ÑÒ½¬¸à
    'slimeball': '\u9ecf\u6db2\u7403',  # ð¤ÒºÇò
    'prismarine shard': '\u6d77\u6676\u7247',  # º£¾§Æ¬
    'prismarine crystals': '\u6d77\u6676\u7c92',  # º£¾§Á£
    'rabbit foot': '\u5154\u5b50\u811a',  # ÍÃ×Ó½Å
    'rabbit hide': '\u5154\u5b50\u76ae',  # ÍÃ×ÓÆ¤
    'spider eye': '\u8718\u86db\u773c',  # Ö©ÖëÑÛ
    'fermented spider eye': '\u53d1\u9175\u8718\u86db\u773c',  # ·¢½ÍÖ©ÖëÑÛ
    'rotten flesh': '\u8150\u8089',  # ¸¯Èâ
    'poisonous potato': '\u6bd2\u9a6c\u94c3\u85af',  # ¶¾ÂíÁåÊí
    'pufferfish': '\u6cb3\u8c5a',  # ºÓëà
    'tropical fish': '\u70ed\u5e26\u9c7c',  # ÈÈ´øÓã
    'cod': '\u9ccd\u9c7c',  # ÷¨Óã
    'salmon': '\u9c9b\u9c7c',  # öÙÓã
    'cooked cod': '\u719f\u9ccd\u9c7c',  # Êì÷¨Óã
    'cooked salmon': '\u719f\u9c9b\u9c7c',  # ÊìöÙÓã
    'cooked chicken': '\u719f\u9e21\u8089',  # Êì¼¦Èâ
    'cooked porkchop': '\u719f\u732a\u6392',  # ÊìÖíÅÅ
    'cooked beef': '\u725b\u6392',  # Å£ÅÅ
    'cooked mutton': '\u719f\u7f8a\u8089',  # ÊìÑòÈâ
    'cooked rabbit': '\u719f\u5154\u8089',  # ÊìÍÃÈâ
    'raw chicken': '\u751f\u9e21\u8089',  # Éú¼¦Èâ
    'raw porkchop': '\u751f\u732a\u6392',  # ÉúÖíÅÅ
    'raw beef': '\u751f\u725b\u8089',  # ÉúÅ£Èâ
    'raw mutton': '\u751f\u7f8a\u8089',  # ÉúÑòÈâ
    'raw rabbit': '\u751f\u5154\u8089',  # ÉúÍÃÈâ
    'mushroom stew': '\u8611\u83c7\u7172',  # Ä¢¹½ìÒ
    'rabbit stew': '\u5154\u8089\u7172',  # ÍÃÈâìÒ
    'beetroot soup': '\u751c\u83dc\u6c64',  # Ìð²ËÌÀ
    'cookie': '\u66f2\u5947\u997c\u5e72',  # ÇúÆæ±ý¸É
    'cake': '\u86cb\u7cd5',  # µ°¸â
    'pumpkin pie': '\u5357\u74dc\u6d3e',  # ÄÏ¹ÏÅÉ
    'melon slice': '\u897f\u74dc\u7247',  # Î÷¹ÏÆ¬
    'baked potato': '\u70e4\u9a6c\u94c3\u85af',  # ¿¾ÂíÁåÊí
    'charcoal': '\u6728\u70ad',  # Ä¾Ì¿
    'coal block': '\u7164\u70ad\u5757',  # ÃºÌ¿¿é
    'iron block': '\u94c1\u5757',  # Ìú¿é
    'gold block': '\u91d1\u5757',  # ½ð¿é
    'diamond block': '\u94bb\u77f3\u5757',  # ×êÊ¯¿é
    'emerald block': '\u7eff\u5b9d\u77f3\u5757',  # ÂÌ±¦Ê¯¿é
    'lapis block': '\u9752\u91d1\u77f3\u5757',  # Çà½ðÊ¯¿é
    'redstone block': '\u7ea2\u77f3\u5757',  # ºìÊ¯¿é
    'quartz block': '\u77f3\u82f1\u5757',  # Ê¯Ó¢¿é
    'iron ore': '\u94c1\u77ff\u77f3',  # Ìú¿óÊ¯
    'gold ore': '\u91d1\u77ff\u77f3',  # ½ð¿óÊ¯
    'diamond ore': '\u94bb\u77f3\u77ff\u77f3',  # ×êÊ¯¿óÊ¯
    'emerald ore': '\u7eff\u5b9d\u77f3\u77ff\u77f3',  # ÂÌ±¦Ê¯¿óÊ¯
    'lapis ore': '\u9752\u91d1\u77f3\u77ff\u77f3',  # Çà½ðÊ¯¿óÊ¯
    'redstone ore': '\u7ea2\u77f3\u77ff\u77f3',  # ºìÊ¯¿óÊ¯
    'coal ore': '\u7164\u77ff\u77f3',  # Ãº¿óÊ¯
    'copper ore': '\u94dc\u77ff\u77f3',  # Í­¿óÊ¯
    'nether gold ore': '\u4e0b\u754c\u91d1\u77ff\u77f3',  # ÏÂ½ç½ð¿óÊ¯
    'nether quartz ore': '\u4e0b\u754c\u77f3\u82f1\u77ff\u77f3',  # ÏÂ½çÊ¯Ó¢¿óÊ¯
    'raw iron': '\u7c97\u94c1',  # ´ÖÌú
    'raw gold': '\u7c97\u91d1',  # ´Ö½ð
    'raw copper': '\u7c97\u94dc',  # ´ÖÍ­
    'iron ingot': '\u94c1\u9320',  # Ìú¶§
    'gold ingot': '\u91d1\u9320',  # ½ð¶§
    'copper ingot': '\u94dc\u9320',  # Í­¶§
    'netherite ingot': '\u4e0b\u754c\u5408\u91d1\u9320',  # ÏÂ½çºÏ½ð¶§
    'netherite scrap': '\u4e0b\u754c\u5408\u91d1\u788e\u7247',  # ÏÂ½çºÏ½ðËéÆ¬
    'iron nugget': '\u94c1\u7c92',  # ÌúÁ£
    'gold nugget': '\u91d1\u7c92',  # ½ðÁ£
    'redstone dust': '\u7ea2\u77f3\u7c89',  # ºìÊ¯·Û
    'glowstone dust': '\u8367\u77f3\u7c89',  # Ó«Ê¯·Û
    'lapis lazuli': '\u9752\u91d1\u77f3',  # Çà½ðÊ¯
    'nether quartz': '\u4e0b\u754c\u77f3\u82f1',  # ÏÂ½çÊ¯Ó¢
    'echo shard': '\u56de\u58f0\u788e\u7247',  # »ØÉùËéÆ¬
    'disc fragment': '\u5531\u7247\u788e\u7247',  # ³ªÆ¬ËéÆ¬
    'wheat seeds': '\u5c0f\u9ea6\u79cd\u5b50',  # Ð¡ÂóÖÖ×Ó
    'pumpkin seeds': '\u5357\u74dc\u79cd\u5b50',  # ÄÏ¹ÏÖÖ×Ó
    'melon seeds': '\u897f\u74dc\u79cd\u5b50',  # Î÷¹ÏÖÖ×Ó
    'beetroot seeds': '\u751c\u83dc\u79cd\u5b50',  # Ìð²ËÖÖ×Ó
    'cocoa beans': '\u53ef\u53ef\u8c46',  # ¿É¿É¶¹
    'torchflower seeds': '\u706b\u628a\u82b1\u79cd\u5b50',  # »ð°Ñ»¨ÖÖ×Ó
    'pitcher pod': '\u74f6\u5b50\u8349\u8c46\u8358',  # Æ¿×Ó²Ý¶¹¼Ô
    'sugar cane': '\u7518\u8517',  # ¸ÊÕá
    'chorus fruit': '\u7d2b\u9882\u679c',  # ×ÏËÌ¹û
    'popped chorus fruit': '\u7206\u88c2\u7d2b\u9882\u679c',  # ±¬ÁÑ×ÏËÌ¹û
    'oak boat': '\u6a61\u6728\u8239',  # ÏðÄ¾´¬
    'spruce boat': '\u4e91\u6749\u8239',  # ÔÆÉ¼´¬
    'birch boat': '\u767d\u6866\u8239',  # °×èë´¬
    'jungle boat': '\u4e1b\u6797\u8239',  # ´ÔÁÖ´¬
    'acacia boat': '\u91d1\u5408\u6b22\u8239',  # ½ðºÏ»¶´¬
    'dark oak boat': '\u6df1\u8272\u6a61\u6728\u8239',  # ÉîÉ«ÏðÄ¾´¬
    'mangrove boat': '\u7ea2\u6811\u8239',  # ºìÊ÷´¬
    'cherry boat': '\u6a31\u82b1\u8239',  # Ó£»¨´¬
    'bamboo raft': '\u7af9\u7b4f',  # Öñ·¤
    'oak chest boat': '\u6a61\u6728\u8fd0\u8f93\u8239',  # ÏðÄ¾ÔËÊä´¬
    'spruce chest boat': '\u4e91\u6749\u8fd0\u8f93\u8239',  # ÔÆÉ¼ÔËÊä´¬
    'birch chest boat': '\u767d\u6866\u8fd0\u8f93\u8239',  # °×èëÔËÊä´¬
    'jungle chest boat': '\u4e1b\u6797\u8fd0\u8f93\u8239',  # ´ÔÁÖÔËÊä´¬
    'acacia chest boat': '\u91d1\u5408\u6b22\u8fd0\u8f93\u8239',  # ½ðºÏ»¶ÔËÊä´¬
    'dark oak chest boat': '\u6df1\u8272\u6a61\u6728\u8fd0\u8f93\u8239',  # ÉîÉ«ÏðÄ¾ÔËÊä´¬
    'mangrove chest boat': '\u7ea2\u6811\u8fd0\u8f53\u8239',  # ºìÊ÷ÔËÊä´¬
    'cherry chest boat': '\u6a31\u82b1\u8fd0\u8f93\u8239',  # Ó£»¨ÔËÊä´¬
    'bamboo chest raft': '\u7af9\u8fd0\u8f93\u7b4f',  # ÖñÔËÊä·¤
    'minecart with chest': '\u8fd0\u8f93\u77ff\u8f66',  # ÔËÊä¿ó³µ
    'minecart with furnace': '\u52a8\u529b\u77ff\u8f66',  # ¶¯Á¦¿ó³µ
    'minecart with tnt': 'TNT\u77ff\u8f66',  # TNT¿ó³µ
    'minecart with hopper': '\u6f0f\u6597\u77ff\u8f66',  # Â©¶·¿ó³µ
    'minecart with spawner': '\u5237\u602a\u7b3c\u77ff\u8f66',  # Ë¢¹ÖÁý¿ó³µ
    'minecart with command block': '\u547d\u4ee4\u65b9\u5757\u77ff\u8f66',  # ÃüÁî·½¿é¿ó³µ
    'powered rail': '\u52a8\u529b\u94c1\u8f68',  # ¶¯Á¦Ìú¹ì
    'detector rail': '\u63a2\u6d4b\u94c1\u8f68',  # Ì½²âÌú¹ì
    'activator rail': '\u6fc0\u6d3b\u94c1\u8f68',  # ¼¤»îÌú¹ì
    'recovery compass': '\u590d\u82cf\u6307\u5357\u9488',  # ¸´ËÕÖ¸ÄÏÕë
    'fishing rod': '\u9493\u9c7c\u7aff',  # µöÓã¸Í
    'shears': '\u526a\u5200',  # ¼ôµ¶
    'fire charge': '\u706b\u7130\u5f39',  # »ðÑæµ¯
    'glass bottle': '\u73bb\u7483\u74f6',  # ²£Á§Æ¿
    'water bucket': '\u6c34\u6876',  # Ë®Í°
    'lava bucket': '\u5ca9\u6d46\u6876',  # ÑÒ½¬Í°
    'milk bucket': '\u725b\u5976\u6876',  # Å£ÄÌÍ°
    'powder snow bucket': '\u7ec6\u96ea\u6876',  # Ï¸Ñ©Í°
    'bucket of cod': '\u9ccd\u9c7c\u6876',  # ÷¨ÓãÍ°
    'bucket of salmon': '\u9c9b\u9c7c\u6876',  # öÙÓãÍ°
    'bucket of tropical fish': '\u70ed\u5e26\u9c7c\u6876',  # ÈÈ´øÓãÍ°
    'bucket of pufferfish': '\u6cb3\u8c5a\u6876',  # ºÓëàÍ°
    'bucket of axolotl': '\u7f8e\u897f\u87b5\u6876',  # ÃÀÎ÷ó¢Í°
    'bucket of tadpole': '\u8713\u86aa\u6876',  # òòò½Í°
    'snowball': '\u96ea\u7403',  # Ñ©Çò
    'ender eye': '\u672b\u5f71\u4e4b\u773c',  # Ä©Ó°Ö®ÑÛ
    'written book': '\u4e66\u4e0e\u7b14',  # ÊéÓë±Ê
    'book and quill': '\u4e66\u4e0e\u7b14',  # ÊéÓë±Ê
    'enchanted book': '\u9644\u9b54\u4e66',  # ¸½Ä§Êé
    'knowledge book': '\u77e5\u8bc6\u4e4b\u4e66',  # ÖªÊ¶Ö®Êé
    'writable book': '\u53ef\u5199\u4e66',  # ¿ÉÐ´Êé
    'map': '\u5730\u56fe',  # µØÍ¼
    'empty map': '\u7a7a\u5730\u56fe',  # ¿ÕµØÍ¼
    'filled map': '\u5df2\u7ed8\u5236\u7684\u5730\u56fe',  # ÒÑ»æÖÆµÄµØÍ¼
    'explorer map': '\u63a2\u9669\u5bb6\u5730\u56fe',  # Ì½ÏÕ¼ÒµØÍ¼
    'ocean explorer map': '\u6d77\u6d0b\u63a2\u9669\u5bb6\u5730\u56fe',  # º£ÑóÌ½ÏÕ¼ÒµØÍ¼
    'woodland explorer map': '\u6797\u5730\u63a2\u9669\u5bb6\u5730\u56fe',  # ÁÖµØÌ½ÏÕ¼ÒµØÍ¼
    'treasure map': '\u85cf\u5b9d\u56fe',  # ²Ø±¦Í¼
    'buried treasure map': '\u57cb\u85cf\u7684\u5b9d\u85cf\u5730\u56fe',  # Âñ²ØµÄ±¦²ØµØÍ¼
    'trial key': '\u8bd5\u70bc\u5ba4\u94a5\u5319',  # ÊÔÁ¶ÊÒÔ¿³×
    'ominous trial key': '\u4e0d\u7965\u8bd5\u70bc\u5ba4\u94a5\u5319',  # ²»ÏéÊÔÁ¶ÊÒÔ¿³×
    'vault': '\u5b9d\u5e93',  # ±¦¿â
    'ominous vault': '\u4e0d\u7965\u5b9d\u5e93',  # ²»Ïé±¦¿â
    'trial spawner': '\u8bd5\u70bc\u5237\u602a\u7b3c',  # ÊÔÁ¶Ë¢¹ÖÁý
    'breeze': '\u5fae\u98ce',  # Î¢·ç
    'wind charge': '\u98ce\u5f39',  # ·çµ¯
    'mace': '\u72fc\u7259\u68d2',  # ÀÇÑÀ°ô
    'heavy core': '\u91cd\u6838',  # ÖØºË
    'flow armor trim': '\u6d41\u52a8\u76d4\u7532\u9970\u7eb9',  # Á÷¶¯¿ø¼×ÊÎÎÆ
    'bolt armor trim': '\u95ea\u7535\u76d4\u7532\u9970\u7eb9',  # ÉÁµç¿ø¼×ÊÎÎÆ
    'flow banner pattern': '\u6d41\u52a8\u65d7\u5e1c\u56fe\u6848',  # Á÷¶¯ÆìÖÄÍ¼°¸
    'guster banner pattern': '\u72c2\u98ce\u65d7\u5e1c\u56fe\u6848',  # ¿ñ·çÆìÖÄÍ¼°¸
    'flow pottery sherd': '\u6d41\u52a8\u9676\u7247',  # Á÷¶¯ÌÕÆ¬
    'guster pottery sherd': '\u72c2\u98ce\u9676\u7247',  # ¿ñ·çÌÕÆ¬
    'scrape pottery sherd': '\u522e\u64e6\u9676\u7247',  # ¹Î²ÁÌÕÆ¬
    'armadillo scute': '\u72b0\u5c71\u7532\u9cde\u7532',  # áìáüÁÛ¼×
    'wolf armor': '\u72fc\u76d4\u7532',  # ÀÇ¿ø¼×
    'armadillo spawn egg': '\u72b0\u5c71\u7532\u751f\u6210\u86cb',  # áìáüÉú³Éµ°
    'bogged spawn egg': '\u6cbc\u6cfd\u9ab7\u9ac5\u751f\u6210\u86cb',  # ÕÓÔó÷¼÷ÃÉú³Éµ°
    'breeze spawn egg': '\u5fae\u98ce\u751f\u6210\u86cb'  # Î¢·çÉú³Éµ°
}

# Difficulty classification
BASIC_WORDS = {
    'stone', 'dirt', 'grass', 'wood', 'water', 'sand', 'gravel', 'coal', 'iron', 'oak', 'planks',
    'leaves', 'sapling', 'cobblestone', 'torch', 'chest', 'crafting', 'table', 'furnace',
    'pickaxe', 'sword', 'axe', 'shovel', 'hoe', 'stick', 'wool', 'bed', 'door', 'stairs',
    'slab', 'fence', 'gate', 'glass', 'flower', 'mushroom', 'apple', 'bread', 'wheat',
    'seeds', 'pig', 'cow', 'sheep', 'chicken', 'leather', 'feather', 'string', 'flint',
    'bucket', 'milk', 'egg', 'sugar', 'paper', 'book', 'granite', 'diorite', 'andesite',
    'bedrock', 'spruce', 'birch', 'jungle', 'acacia', 'sponge', 'dandelion', 'poppy',
    'orchid', 'tulip', 'daisy', 'cactus', 'clay', 'brick', 'sandstone', 'rail', 'minecart',
    'boat', 'compass', 'clock', 'painting', 'sign', 'ladder', 'snow', 'ice', 'pumpkin',
    'melon', 'carrot', 'potato', 'beetroot', 'kelp', 'bamboo', 'honey', 'honeycomb',
    'red', 'blue', 'green', 'yellow', 'white', 'black', 'orange', 'purple', 'pink',
    'gray', 'brown', 'cyan', 'lime', 'magenta', 'light'
}

INTERMEDIATE_WORDS = {
    'diamond', 'emerald', 'gold', 'redstone', 'lapis', 'quartz', 'obsidian', 'nether',
    'portal', 'blaze', 'ghast', 'zombie', 'skeleton', 'creeper', 'spider', 'enderman',
    'bow', 'arrow', 'armor', 'helmet', 'chestplate', 'leggings', 'boots', 'shield',
    'enchanting', 'anvil', 'brewing', 'potion', 'cauldron', 'dispenser', 'dropper',
    'hopper', 'piston', 'lever', 'button', 'pressure', 'plate', 'trapdoor', 'noteblock',
    'jukebox', 'beacon', 'conduit', 'prismarine', 'guardian', 'elder', 'sealantern',
    'magma', 'soul', 'blackstone', 'basalt', 'crimson', 'warped', 'shroomlight',
    'respawn', 'anchor', 'lodestone', 'netherite', 'ancient', 'debris', 'crying',
    'piglin', 'hoglin', 'strider', 'zoglin', 'target', 'copper', 'amethyst', 'deepslate',
    'dripstone', 'moss', 'azalea', 'dripleaf', 'spore', 'blossom', 'glow', 'lichen',
    'sculk', 'catalyst', 'sensor', 'shrieker', 'warden', 'mangrove', 'mud', 'frog',
    'tadpole', 'allay', 'goat', 'axolotl', 'squid', 'powder', 'telescope', 'bundle',
    'candle', 'lightning', 'rod', 'spyglass', 'tinted', 'tuff', 'calcite', 'pointed',
    'rooted', 'hanging', 'cave', 'lush', 'dripstone', 'powder', 'snow'
}

ADVANCED_WORDS = {
    'dragon', 'wither', 'elytra', 'shulker', 'chorus', 'purpur', 'end', 'crystal',
    'totem', 'undying', 'trident', 'crossbow', 'phantom', 'membrane', 'nautilus',
    'shell', 'heart', 'sea', 'scute', 'turtle', 'spectral', 'tipped', 'lingering',
    'splash', 'breath', 'nether', 'star', 'enchanted', 'golden', 'structure',
    'void', 'barrier', 'command', 'repeating', 'chain', 'jigsaw', 'debug',
    'knowledge', 'spawner', 'infested', 'silverfish', 'endermite', 'vex', 'evoker',
    'vindicator', 'pillager', 'ravager', 'witch', 'illusioner', 'giant', 'horse',
    'donkey', 'mule', 'llama', 'trader', 'wandering', 'fox', 'panda', 'bee',
    'polar', 'bear', 'dolphin', 'cod', 'salmon', 'tropical', 'fish', 'pufferfish',
    'bat', 'parrot', 'ocelot', 'cat', 'wolf', 'rabbit', 'mooshroom', 'golem',
    'villager', 'iron', 'snow', 'trial', 'vault', 'breeze', 'wind', 'charge',
    'mace', 'heavy', 'core', 'flow', 'bolt', 'guster', 'scrape', 'armadillo',
    'bogged', 'ominous'
}

def classify_difficulty(word: str) -> str:
    """Classify word difficulty based on game progression."""
    word_lower = word.lower()
    
    # Check for exact matches first
    if word_lower in BASIC_WORDS:
        return 'basic'
    elif word_lower in INTERMEDIATE_WORDS:
        return 'intermediate'
    elif word_lower in ADVANCED_WORDS:
        return 'advanced'
    
    # Check for partial matches
    for basic_word in BASIC_WORDS:
        if basic_word in word_lower or word_lower in basic_word:
            return 'basic'
    
    for intermediate_word in INTERMEDIATE_WORDS:
        if intermediate_word in word_lower or word_lower in intermediate_word:
            return 'intermediate'
    
    for advanced_word in ADVANCED_WORDS:
        if advanced_word in word_lower or word_lower in advanced_word:
            return 'advanced'
    
    # Default to intermediate if no match
    return 'intermediate'

def get_wiki_translation(word: str) -> Optional[str]:
    """Get translation from wiki mappings."""
    word_lower = word.lower().strip()
    return WIKI_TRANSLATIONS.get(word_lower)

def generate_phrase(word: str, chinese: str) -> tuple[str, str]:
    """Generate English phrase and Chinese translation."""
    word_lower = word.lower()
    
    # Determine category and generate phrase
    if any(tool in word_lower for tool in ['sword', 'pickaxe', 'axe', 'shovel', 'hoe']):
        phrase = f"use {word.lower()}"
        phrase_translation = f"\u4f7f\u7528{chinese}"  # Ê¹ÓÃ
    elif any(block in word_lower for block in ['stone', 'dirt', 'wood', 'planks', 'block']):
        phrase = f"mine {word.lower()}"
        phrase_translation = f"\u6316\u6398{chinese}"  # ÍÚ¾ò
    elif any(food in word_lower for food in ['apple', 'bread', 'meat', 'fish', 'carrot']):
        phrase = f"eat {word.lower()}"
        phrase_translation = f"\u5403{chinese}"  # ³Ô
    elif any(animal in word_lower for animal in ['pig', 'cow', 'sheep', 'chicken']):
        phrase = f"{word.lower()} farm"
        phrase_translation = f"{chinese}\u519c\u573a"  # Å©³¡
    elif any(color in word_lower for color in ['red', 'blue', 'green', 'yellow', 'white', 'black']):
        phrase = f"{word.lower()} wool"
        phrase_translation = f"{chinese}\u7f8a\u6bdb"  # ÑòÃ«
    else:
        phrase = f"find {word.lower()}"
        phrase_translation = f"\u627e\u5230{chinese}"  # ÕÒµ½
    
    return phrase, phrase_translation

def load_existing_words(file_path: str) -> Set[str]:
    """Load existing words from a vocabulary file."""
    existing_words = set()
    if os.path.exists(file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                for item in data:
                    existing_words.add(item.get('word', '').lower())
        except Exception as e:
            print(f"Error loading {file_path}: {e}")
    return existing_words

def process_vocabulary_entry(entry: dict) -> dict:
    """Process a single vocabulary entry."""
    word = entry.get('word', '').strip()
    if not word or word == '\u82f1\u6587\u540d\u79f0':  # Ó¢ÎÄÃû³Æ
        return None
    
    # Get or update Chinese translation
    chinese = entry.get('chinese', '')
    if not chinese or chinese == '??':
        wiki_translation = get_wiki_translation(word)
        if wiki_translation:
            chinese = wiki_translation
        else:
            # Fallback translation logic
            chinese = word  # Keep original if no translation found
    
    # Classify difficulty
    difficulty = classify_difficulty(word)
    
    # Generate or update phrases
    phrase = entry.get('phrase', '')
    phrase_translation = entry.get('phraseTranslation', '')
    
    if not phrase or phrase == '????' or not phrase_translation or phrase_translation == '????':
        generated_phrase, generated_phrase_translation = generate_phrase(word, chinese)
        if not phrase or phrase == '????':
            phrase = generated_phrase
        if not phrase_translation or phrase_translation == '????':
            phrase_translation = generated_phrase_translation
    
    # Determine category
    category = entry.get('category', '')
    if not category:
        word_lower = word.lower()
        if any(tool in word_lower for tool in ['sword', 'pickaxe', 'axe', 'shovel', 'hoe']):
            category = 'tool'
        elif any(block in word_lower for block in ['stone', 'dirt', 'wood', 'block']):
            category = 'block'
        elif any(food in word_lower for food in ['apple', 'bread', 'meat', 'fish']):
            category = 'food'
        elif any(animal in word_lower for animal in ['pig', 'cow', 'sheep', 'chicken']):
            category = 'animal'
        elif any(color in word_lower for color in ['red', 'blue', 'green', 'yellow', 'white', 'black']):
            category = 'color'
        else:
            category = 'item'
    
    # Build the processed entry
    processed_entry = {
        'word': word,
        'standardized': entry.get('standardized', word),
        'chinese': chinese,
        'phonetic': entry.get('phonetic', ''),
        'phrase': phrase,
        'phraseTranslation': phrase_translation,
        'difficulty': difficulty,
        'category': category,
        'imageURLs': entry.get('imageURLs', [])
    }
    
    return processed_entry

def organize_vocabulary():
    """Main function to organize vocabulary from minecraft_image_links.json."""
    print("Starting vocabulary organization...")
    
    # Load source data
    if not os.path.exists(IMAGE_LINKS_PATH):
        print(f"Source file not found: {IMAGE_LINKS_PATH}")
        return
    
    with open(IMAGE_LINKS_PATH, 'r', encoding='utf-8') as f:
        source_data = json.load(f)
    
    print(f"Loaded {len(source_data)} entries from source file")
    
    # Load existing vocabulary files
    existing_basic = load_existing_words(BASIC_PATH)
    existing_intermediate = load_existing_words(INTERMEDIATE_PATH)
    existing_advanced = load_existing_words(ADVANCED_PATH)
    
    print(f"Existing words - Basic: {len(existing_basic)}, Intermediate: {len(existing_intermediate)}, Advanced: {len(existing_advanced)}")
    
    # Process and categorize entries
    basic_entries = []
    intermediate_entries = []
    advanced_entries = []
    
    processed_count = 0
    skipped_count = 0
    
    for entry in source_data:
        processed_entry = process_vocabulary_entry(entry)
        if not processed_entry:
            skipped_count += 1
            continue
        
        word_lower = processed_entry['word'].lower()
        difficulty = processed_entry['difficulty']
        
        # Check if word already exists in target files
        if (word_lower in existing_basic or 
            word_lower in existing_intermediate or 
            word_lower in existing_advanced):
            continue
        
        # Add to appropriate category
        if difficulty == 'basic':
            basic_entries.append(processed_entry)
        elif difficulty == 'intermediate':
            intermediate_entries.append(processed_entry)
        else:  # advanced
            advanced_entries.append(processed_entry)
        
        processed_count += 1
    
    print(f"Processed {processed_count} new entries, skipped {skipped_count}")
    print(f"New entries - Basic: {len(basic_entries)}, Intermediate: {len(intermediate_entries)}, Advanced: {len(advanced_entries)}")
    
    # Load and update existing files
    def update_vocabulary_file(file_path: str, new_entries: List[dict]):
        if not new_entries:
            print(f"No new entries for {os.path.basename(file_path)}")
            return
        
        existing_data = []
        if os.path.exists(file_path):
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    existing_data = json.load(f)
            except Exception as e:
                print(f"Error loading {file_path}: {e}")
        
        # Combine and sort
        combined_data = existing_data + new_entries
        combined_data.sort(key=lambda x: x.get('word', '').lower())
        
        # Create backup
        if existing_data:
            backup_path = file_path.replace('.json', f'.backup.{int(time.time())}.json')
            with open(backup_path, 'w', encoding='utf-8') as f:
                json.dump(existing_data, f, ensure_ascii=False, indent=2)
            print(f"Backup created: {backup_path}")
        
        # Save updated file
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(combined_data, f, ensure_ascii=False, indent=2)
        
        print(f"Updated {os.path.basename(file_path)} with {len(new_entries)} new entries (total: {len(combined_data)})")
    
    # Update all vocabulary files
    update_vocabulary_file(BASIC_PATH, basic_entries)
    update_vocabulary_file(INTERMEDIATE_PATH, intermediate_entries)
    update_vocabulary_file(ADVANCED_PATH, advanced_entries)
    
    print("\nVocabulary organization completed!")
    print(f"Total new entries added: {len(basic_entries) + len(intermediate_entries) + len(advanced_entries)}")

if __name__ == '__main__':
    organize_vocabulary()