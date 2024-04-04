# Animal-recognition-algorithm

## Download .csv files which include image ids and labels

```
wget -P /data https://storage.googleapis.com/openimages/v7/oidv7-class-descriptions.csv
```

```
wget -P /data https://storage.googleapis.com/openimages/v7/oidv7-train-annotations-human-imagelabels.csv
```

## Intsall dependencies

```
pipenv install
```

## Run pipenv shell

```
pipenv shell
```

## Download images with given class name

```
pipenv run get_image_ids class_name
```

```
pipenv run dowload_images
```

You can find downloaded images in `data/images` directory
