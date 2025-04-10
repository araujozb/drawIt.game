import json
import matplotlib.pyplot as plt
import os

output_dir = 'vehicle'  # Nome da pasta onde as imagens serão salvas
os.makedirs(output_dir, exist_ok=True)  # Cria a pasta se ela não existir

with open('skateboard.ndjson') as f:
    for i, line in enumerate(f):
        data = json.loads(line)
        if data['recognized']:
            plt.figure()
            for stroke in data['drawing']:
                plt.plot(stroke[0], stroke[1])
            plt.axis('off')
            plt.savefig(os.path.join(output_dir, f'skateboard_{i}.png'))  # Salva na pasta escolhida
            plt.close()
        if i == 40: break  
