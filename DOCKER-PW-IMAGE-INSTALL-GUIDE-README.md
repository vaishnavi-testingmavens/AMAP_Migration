📦 Instructions to Extract and Use the Playwright Framework via Docker
Follow these steps to extract the Playwright automation framework from the Docker image and use it on your machine.

✅ Step 1: Create a Folder
Create a folder at your desired location to store the Playwright framework. For example:

bash

mkdir playwright-framework
cd playwright-framework

On Windows, you can do this using File Explorer or via Command Prompt / PowerShell.

✅ Step 2: Place the Docker Image File
Move the file tm-playwright-template.tar.gz into the folder you just created.

✅ Step 3: Open a Terminal or Command Prompt
Open a terminal (macOS/Linux) or Command Prompt / PowerShell (Windows).

Navigate into the folder you created:

bash

cd path/to/your/folder


✅ Step 4: Decompress the Docker Image File
If you're on macOS or Linux:
bash

gzip -d tm-playwright-template.tar.gz

If you're on Windows:
Right-click the file and extract it using 7-Zip or WinRAR.

This will give you a file called: tm-playwright-template.tar

✅ Step 5: Load the Docker Image
Once extracted, run the following command to load the Docker image:

bash

docker load -i tm-playwright-template.tar

✅ Step 6: Run the Docker Container to Export the Framework
Make sure you are inside the same folder where you placed the .tar file, and then run:

On macOS / Linux:
bash

docker run --rm -v "$(pwd):/export" tm-playwright-template

On Windows (PowerShell):
powershell

docker run --rm -v "${PWD}:/export" tm-playwright-template


🎉 Done!
The framework will now be extracted directly into the folder you created. You can now open it in your code editor