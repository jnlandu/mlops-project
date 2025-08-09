# Okapi Chat:  A text sumarization, chat and question answering web site.

This is a project that aims to provide a platform where users can upload their text or  PDF files, get a summary of the content. Additional to summarization, the user can chat with our bot. 

In the later version, the user will also be to ask questions about the content.

The project leverage `Groq API`  for chat functionality, text summarization, and for question answering. The project is built using Python, FastAPI, and Docker.

## Features
- **Summarization**: Summarize the  text-like documents .
- **Question Answering (QA)**: Perform QA ( added feature, not previously rquired in the project).
- **Question Answering (QA)**: Perform QA  on Text or PDFs( added feature, not previously rquired in the project) is in progress.
## Requirements
 ```txt
    python>=3.8
    PyPDF2
    requests
    fastapi
    uvicorn
    pytest
    groq
    python-dotenv
    bcrypt 
 
```

Install dependencies locally with:
```bash
pip install -r requirements.txt
```

## Project structure

```GraphQL
.
├── README.md
├── backend
│   ├── Dockerfile
│   ├── app
│   │   ├── __init__.py
│   │   ├── app.py
│   │   └── main.py
│   ├── local.settings.json
│   ├── mockup
│   │   ├── SignUp.png
│   │   ├── accountSuccessfullyCreated.png
│   │   ├── loginlogin.png
│   │   └── updateUserInfoConfirmation.png
│   ├── requirements.txt
│   ├── routers
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── chat.py
│   │   └── chat_history.py
│   ├── tests
│   │   ├── __init__.py
│   │   ├── sample.pdf
│   │   ├── sample.txt
│   │   ├── test_auth.py
│   │   ├── tpdf.py
│   │   └── ttxt.py
│   └── utils
│       ├── __init__.py
│       ├── api.py
│       ├── auth.py
│       ├── database.py
│       ├── deps.py
│       ├── models.py
│       ├── okapi_app.db
│       ├── pdf.py
│       └── summarizer.py
├── docs.md
├── frontend
│   ├── Dockerfile
│   ├── README.md
│   ├── app
│   │   ├── admin
│   │   │   ├── login
│   │   │   │   └── page.js
│   │   │   └── page.js
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── login
│   │   │   └── page.js
│   │   ├── page.js
│   │   ├── page.module.css
│   │   └── register
│   │       └── page.js
│   ├── components
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── ProtectedRoute.js
│   │   └── Welcome.js
│   ├── context
│   │   └── AuthContext.js
│   ├── jsconfig.json
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── product
│   └── Product design .jpg
└── project-tree.txt

16 directories, 54 files

```
    
## Installation
To run the application, you need to install the required dependencies. You can install them locally or use Docker.  If you want to run it locally, here are the steps:

1. Clone the repository:
```bash
git clone  https://github.com/jnlandu/text-summarization.git
```
2. Navigate to the project directory:
```bash
cd text-summarization
```
3. Install the dependencies:
```bash
pip install -r requirements.txt
```
4. Run the FastAPI application:
```bash
uvicorn app.main:app --reload or fastapi dev app/main.py
```
Note: You  will need to have the `groq` API key to run the application. You can get the API key by signing up on the [Groq API](https://groqapi.com/). Set the API key in the `.env` file, with the name `GROQ_API_KEY`, that is:
```bash
GROQ_API_KEY=your_api_key
```
Ensure that the `.env` file is in the root directory of the project, like described above. The application will be available at `http://localhost:8000`.

## Usage
Once the application is running, you can access the FastAPI Swagger UI at `http://localhost:8000/docs`.  Here are the steps to access the full app:
1. Authenticate the user by signing up or logging in. Click on lock icon on the top right corner of the page and Use the following credentials:
```txt
credentials:
    username: admin | user
    password: userpass
```
2. Click on the "Try it out" button.
3. Type or paste your text in the text area under Request body. Make user the text is enclosed in quotes.
4. Click on the "Execute" button.
5. The response will be displayed in the "Response body" section.

Note: As mentioned earlier, the chat functionality is also available. The document-chat functionality is in progress.

## Deploy your application using Docker
- You can pull the docker image from the docker hub and run it on your local machine or server.
- The docker image is available on the docker hub [here](https://hub.docker.com/repository/docker/jnlandu/api/general) or you can pull it using the following command:
```bash
docker pull jnlandu/api:latest
```
- if you have cloned the repository, you can build the docker image using the following command:
```bash
docker build -t your-preferred-image-name  .
```
- You can run the docker container using the following command:
```bash
docker run -d -p 8000:8000 your-preferred-image-name
```
- Pass the API key as an environment variable:
```bash
docker run -d -p 8000:8000 -env-file ./.env your-preferred-image-name
```
The docker container will be available at `http://localhost:8000`.

## Deployment with Azure
- The project is deployed on Azure and can be accessed [here](https://okapi-chat.azurewebsites.net/docs). 

- CI/CD is implemented using GitHub Actions. The workflow file is available in the `.github/workflows` folder.


## Running Tests
The project includes a basic testing structure within the `/tests` folder. Ensure you have the necessary dependencies installed, and run:
```bash
pytest tests/
```
As for now, only the authentication tests are available. The tests for the PDF and text files are in progress.


## In Progress
Here are the features that are in progress:
- Add frontend for the web application (already built and  will be available soon).
- The mockup for the frontend is available in the `mockup` folder.
- The frontend mockup  and design is built using Penpot, a free and open-source design tool, and can be accessed [here](https://design.penpot.app/#/view/c04641ea-355e-80b8-8005-0470a06594c7?page-id=a2ce2100-8690-8062-8005-048c1cd45e40&section=interactions&frame-id=657f4724-f349-80ae-8005-060334d868a5&index=0&share-id=feb30645-e691-8018-8005-08062f92a59f).
- Can play with our prototype [here](https://design.penpot.app/#/view/c04641ea-355e-80b8-8005-0470a06594c7?page-id=a2ce2100-8690-8062-8005-048c1cd45e40&section=interactions&frame-id=657f4724-f349-80ae-8005-060334d868a5&index=0&interactions-mode=show&share-id=feb30645-e691-8018-8005-08062f92a59f) and give us feedback on the design and the user experience. To show interactions, click on the "Interactions" tab on the top right corner of the page.

## Tech stack
The backend is built using:
- Python
- FastAPI
- Docker
- Pydantic
- Azure Blob Storage for users' PDF files to be processed and allow users to chat with.
- Azure PostgreSQL for the database and chat history of users

The frontend is built using:
- HTML
- CSS
- JavaScript
- Next.js 14
- Bootsrtrap 5


## Authors
- [Jeremy N. Mabiala](https://jnlandu.github.io/)
- [Atou]()
- [Senanou ]()


## Contributing
Contributions are welcome! For feature requests, bug reports, or questions, please open an issue.


## Acknowledgements
- [Groq API](https://groqapi.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Hugging Face Transformers](https://huggingface.co/transformers/)
- [PyPDF2 Documentation](https://pypdf2.readthedocs.io/en/latest/)
- [Azure Documentation](https://docs.microsoft.com/en-us/azure/)
- [Docker Documentation](https://docs.docker.com/)
- [Next.js Documentation](https://nextjs.org/docs)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
