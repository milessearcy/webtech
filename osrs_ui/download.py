import requests, os
import json
import time
def download(itemID):
    attempt = 0
    while 1:
        attempt += 1
        try:

            url = f"https://static.runelite.net/cache/item/icon/{itemID}.png"
            r = requests.get(url)
            if r.status_code == 200:
                with open(f"./assets/img/sprites/{itemID}.png", "wb") as f:
                    f.write(r.content)
                    print("Downloaded: ", itemID)
                return
        except:
            print(f"trying again, attempt = {attempt}" )


url = "https://prices.runescape.wiki/api/v1/osrs/mapping"
r = requests.get(url)
data = r.json()
number = 0

for i in data:
    number = number + 1
    print (f"{number}/{len(data)}")
    if f"{i['id']}.png" not in  os.listdir("./assets/img/sprites/"):
        download(i["id"])
        time.sleep(1)
    
