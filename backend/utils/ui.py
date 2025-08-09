from PIL import Image
from typing import Text


def display_report(report_path: Text):
    """Display the report
    Args:
        report_path (Text): The path to the report
    Returns:
        Image: The image of the report

    """
    return Image.open(report_path)

