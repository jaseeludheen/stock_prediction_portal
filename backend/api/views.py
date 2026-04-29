from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework.response import Response
from rest_framework import status
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime


# Create your views here.


class StockPredictionAPIView(APIView):
    def post(self, request):
        serialzer = StockPredictionSerializer(data=request.data)
        if serialzer.is_valid():
            ticker = serialzer.validated_data['ticker']

            # Fetch the data from yfinance
            now = datetime.now()
            start = datetime(now.year-10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)
            print(df)

           # check df is empty or not
            if df.empty:
                return Response({"error": "No data found for the given ticker.", 
                                'status': status.HTTP_404_NOT_FOUND})
            return Response({'status': 'success', 'ticker': ticker})