# Animal-recognition-algorithm

Fill in .env file according to .env_example

## Download .csv files which include image ids and labels

```
wget -P /data https://storage.googleapis.com/openimages/v7/oidv7-class-descriptions.csv
```

```
wget -P /data https://storage.googleapis.com/openimages/v7/oidv7-train-annotations-human-imagelabels.csv
```

## Install dependencies

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
pipenv run download_images
```

You can find downloaded images in `data/images` directory

## Train model

```
pipenv run train_model
```

## Deploy lambda docker image to ECR

```
pipenv run deploy_lambda_image
```

## Deploy lambda

```
pipenv run deploy_lambda
```
