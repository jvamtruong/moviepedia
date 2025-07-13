#!/bin/bash

# Wait for Elasticsearch to start
until curl -s http://elasticsearch:9200/_cluster/health | grep -q "green\|yellow"; do
  sleep 5
done

# Create index with mapping
curl -X PUT "http://elasticsearch:9200/movies_v2" \
  -H "Content-Type: application/json" \
  -d @/usr/share/elasticsearch/init/movies_v2_mapping.json

# Import data using bulk API
curl -X POST "http://elasticsearch:9200/_bulk" \
  -H "Content-Type: application/json" \
  --data-binary @/usr/share/elasticsearch/init/movies_v2_data_bulk.jsonl