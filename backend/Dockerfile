# Use Python base image
FROM python:3.9

# Copy project files
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend files
COPY . .

# Expose the port Flask runs on
EXPOSE 5001

# Run the Flask app
CMD ["python", "app.py"]
