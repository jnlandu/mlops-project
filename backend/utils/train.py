
import torch
import torch.nn as nn
from tqdm import tqdm


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def train(model, criterion, data_loader, optimizer, num_epochs,device):
    """Simple training loop for a PyTorch model.""" 
    
    # Make sure model is in training mode.
    model.train()
    
    # Move model to the device (CPU or GPU).
    model.to(device)
    
    # Exponential moving average of the loss.
    ema_loss = None

    print('----- Training Loop -----')
    # Loop over epochs.
    for epoch in range(num_epochs):
        
      # Loop over data.
      for batch_idx, (features, target) in enumerate(data_loader):
            
        # Forward pass.
        output = model(features.to(device))
        loss = criterion(output.to(device), target.to(device))

        # Backward pass.
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

      # NOTE: It is important to call .item() on the loss before summing.
        if ema_loss is None:
            ema_loss = loss.item()
        else:
            ema_loss += (loss.item() - ema_loss) * 0.01 

      # Print out progress the end of epoch.
      print('Epoch: {} \tLoss: {:.6f}'.format(epoch, ema_loss),)
      torch.save(model.state_dict(), 'trained_model/model.ckpt')

      print('Training complete.')





def train1(model, dataloaders, image_datasets, criterion, optimizer, num_epochs):
    print("#" * 20, "Training loop", "#" * 20)
    
    # Move model to the device (CPU or GPU).
    model.to(device)
    
    for epoch in range(num_epochs):
        print(f'Epoch {epoch+1}/{num_epochs}')
        print('-' * 10)
        
        # Each epoch has a training and validation phase
        for phase in ['Train', 'Test']:
            if phase == 'Train':
                model.train()  # Set model to training mode
            else:
                model.eval()  # Set model to evaluation mode

            running_loss = 0.0
            running_corrects = 0
            
            # Wrap the data loader with tqdm for a progress bar
            with tqdm(dataloaders[phase], unit="batch") as t_loader:
                t_loader.set_description(f'{phase} Epoch {epoch+1}/{num_epochs}')
                
                # Iterate over data
                for inputs, labels in t_loader:
                    inputs, labels = inputs.to(device), labels.to(device)

                    # Zero the parameter gradients
                    optimizer.zero_grad()

                    # Forward pass
                    with torch.set_grad_enabled(phase == 'Train'):
                        outputs = model(inputs)
                        _, preds = torch.max(outputs, 1)
                        loss = criterion(outputs, labels)

                        # Backward pass and optimize only if in training phase
                        if phase == 'Train':
                            loss.backward()
                            optimizer.step()

                    # Statistics
                    running_loss += loss.item() * inputs.size(0)
                    running_corrects += torch.sum(preds == labels.data)
                    
                    # Update the progress bar with the current loss and accuracy
                    epoch_loss = running_loss / len(image_datasets[phase])
                    epoch_acc = running_corrects.double() / len(image_datasets[phase])
                    t_loader.set_postfix({'Loss': epoch_loss, 'Acc': epoch_acc})

            print(f'{phase} Loss: {epoch_loss:.4f} Acc: {epoch_acc:.4f}')
    
    # Save the trained model
    torch.save(model.state_dict(), './models/model.ckpt')

    print('Training complete.')
