import os 
import logging
import tempfile
import pandas as pd
import numpy as np
import requests 
from typing import Callable, Text
from fastapi import APIRouter, HTTPException
from fastapi.responses import (
    HTMLResponse,
    JSONResponse,
    Response,
    FileResponse
)

from evidently import ColumnMapping
from evidently.report import Report
from evidently.test_suite import TestSuite
from evidently.metric_preset import TextEvals
from evidently.descriptors import *
from evidently.metrics import *
from evidently.tests import *
from evidently.features.llm_judge import BinaryClassificationPromptTemplate
from evidently.ui.workspace.cloud import CloudWorkspace
from evidently.ui.dashboards import DashboardPanelTestSuite
from evidently.ui.dashboards import PanelValue
from evidently.ui.dashboards import ReportFilter
from evidently.ui.dashboards import TestFilter
from evidently.ui.dashboards import TestSuitePanelType
from evidently.renderers.html_widgets import WidgetSize
from dotenv import load_dotenv




load_dotenv()

DATA_RAW_PATH=os.getenv("DATA_RAW_PATH")
EVIDENTLY_AI_TOKEN=os.getenv("EVIDENTLY_AI_TOKEN")
EVIDENTLY_TEAM_ID=os.getenv("EVIDENTLY_TEAM_ID")

REPORTS_DIR=os.getenv("REPORTS_DIR")

router = APIRouter(
    prefix='/monitor-model',
    tags=['Monitor the performance of the model']
)


@router.post('/', response_class=FileResponse)
def monitor_model_performance(window_size:int = 300) -> FileResponse: 
    logging.info("Monitoring the performance of the model")
    logging.info("Loading the data")
    assistant_logs = pd.read_csv(DATA_RAW_PATH, index_col=0, parse_dates=['start_time', 'end_time'])
    assistant_logs.index = assistant_logs.start_time
    assistant_logs.index.rename('index', inplace=True)

    # Setting up the Cloud Workspace
    ws = CloudWorkspace(token=EVIDENTLY_AI_TOKEN, url="https://app.evidently.cloud")
    project = ws.create_project("mlops project", team_id=EVIDENTLY_TEAM_ID)
    project.description = "This is a project to monitor the performance of LLMs"

    # Run evaluations:
    column_mapping = ColumnMapping(
        datetime='start_time',
        datetime_features=['end_time'],
        text_features=['question', 'response'],
        categorical_features=['organization', 'model_ID', 'region', 'environment', 'feedback'],
    )

    logging.info("Running the text evaluations")
    text_evals_report = Report(metrics=[
        TextEvals(column_name="response",
                  descriptors=[
                      TextLength(),
                      ]
                  )
    ])

    logging.info("Running the text evaluations report")
    text_evals_report.run(reference_data=None, current_data=assistant_logs[:100], column_mapping=column_mapping)

    # # Save the report to a temporary file
    # with tempfile.NamedTemporaryFile(delete=False, suffix='.html') as tmp_file:
    #     text_evals_report.save(tmp_file.name)
    #     return FileResponse(path=tmp_file.name, filename='report.html', media_type='text/html')
    # Specify a directory and filename
    # report_directory = '/path/to/desired/directory'  # Adjust this path as necessary
    report_filename = 'model_performance_report.html'
    report_path = os.path.join(REPORTS_DIR, report_filename)

    # Save the report
    text_evals_report.save_html(report_path)
    # save(report_path)
    return FileResponse(path=report_path, filename=report_filename, media_type='text/html')



if __name__ == "__main__":
    print(monitor_model_performance())
    print("Model performance monitoring completed successfully")