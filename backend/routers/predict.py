import os
import io
import numpy as np

# PyTorch imports
import torch
import torch.nn as nn
from torchvision.models import resnet18, ResNet18_Weights

from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse

from dotenv import load_dotenv

# Visualization imports
import matplotlib.pyplot as plt
from PIL import Image



# Custom imports
# from app.api import app
from utils.model import model
from utils.tools import get_classes
from utils.transform import data_transforms, imshow_tensor
from utils.deps import db_dependency, user_dependency
from utils.models import ImageData



load_dotenv()

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

#Load the model
model = resnet18(weights=ResNet18_Weights.DEFAULT)
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, 2)  # 2 classes (binary classification)

# Load the model's state_dict
model_weight = os.environ.get("RESNET_CAT_AND_DOG_MODEL_WEIGHT")
TRAIN_DATA_DIR = os.environ.get("TRAIN_DATA_DIR")
classes = get_classes(path=TRAIN_DATA_DIR )

model.load_state_dict(torch.load(model_weight, map_location=torch.device('cpu'), weights_only=True))

model.eval()




# Device configuration (CPU or GPU)
model = model.to(device)


router = APIRouter(
    prefix='/predict',
    tags=['Image classification: Cat or Dog']
)




@router.post('/')
async def upload_image(
      db: db_dependency, user: user_dependency, 
      file: UploadFile = File(...)
):
    
    try:
        # Read the uploaded image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        # Apply the transformations
        image = data_transforms(image).unsqueeze(0)  # Add batch dimension
        image = image.to(device)

        # Perform inference
        with torch.no_grad():  # No need for gradients during inference
            outputs = model(image)
            _, predicted = torch.max(outputs, 1)
            predicted_class = classes[predicted.item()]
        # Return the prediction
        return JSONResponse(content={"predicted_class": predicted_class})

    except Exception as e:
        return JSONResponse(content={"error": str(e)})



