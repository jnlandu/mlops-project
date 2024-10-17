
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, models, transforms
from torch.utils.data import DataLoader
import os



def CustumeData(data_dir):

    # Define data transformations
    data_transforms = {
        'Train': transforms.Compose([
            transforms.RandomResizedCrop(224),
            transforms.RandomHorizontalFlip(),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
        'Test': transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
    }

    # Set your dataset directory
    

    # Load datasets
    image_datasets = {
        'Train': datasets.ImageFolder(os.path.join(data_dir, 'Train'), data_transforms['Train']),
        'Test': datasets.ImageFolder(os.path.join(data_dir, 'Test'), data_transforms['Test'])
    }

    # Load data into batches
    dataloaders = {
        'Train': DataLoader(image_datasets['Train'], batch_size=32, shuffle=True),
        'Test': DataLoader(image_datasets['Test'], batch_size=32, shuffle=False)
    }


    return image_datasets , dataloaders


def get_classes(path):
    
    all_items = os.listdir(path)
    folders = [item for item in all_items if os.path.isdir(os.path.join(path, item))]
    classes = folders

    return classes



