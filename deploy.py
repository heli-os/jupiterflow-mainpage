import requests
import os
import json


with open('_config/configure.json') as f:
    configureData = json.load(f)

ROOT_PATH = configureData["global"]["ROOT_PATH"]

with open(os.path.join(ROOT_PATH, 'data.json'), 'r', encoding='UTF8') as f:
    json_data = json.load(f)
projectData = json_data["content"]["project"]["data"]

for idx, project in enumerate(projectData):
    if project["markdown"]:
        r = requests.get(project["markdown"])
        txt = r.text
    else:
        txt = configureData["global"]["MARKDOWN_EMPTY"]

    markdownPath = os.path.join(ROOT_PATH, 'project', str(idx + 1))
    try:
        if not (os.path.isdir(markdownPath)):
            os.makedirs(os.path.join(markdownPath))
    except OSError as e:
        if e.errno != OSError.EEXIST:
            print("Failed to create directory!!!!!")
            raise

    f = open(os.path.join(markdownPath, "README.md"), mode='wt', encoding='utf-8')
    f.write(txt)

    print("=================================================================")
    print(idx + 1, project["subject"], "::", "README 생성 완료")
    print("=================================================================")

    f.close()
