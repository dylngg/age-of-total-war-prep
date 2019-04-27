#!/usr/local/bin/python3
# Usage: python3 histDataToJs.py source.csv dest.js
import csv
import json


def main(args):
    csvfile = open(args[1], "r")
    fieldnames = (
        "Id",
        "What",
        "Source",
    )
    reader = csv.DictReader(csvfile, fieldnames)

    # Transform list of OrderedDict containing ids and who, what ... into Dict
    # of Dicts, each Dict identified by their respective id and the inner Dict
    # containing the who, what ...
    ids = {}
    next(reader)  # Skip first row of headers
    for row in reader:
        ids[row["Id"]] = row

    # Write out json to js file
    with open(args[2], "w") as jsonfile:
        jsonfile.write("var histData = " + json.dumps(ids) + "\n")


if __name__ == "__main__":
    import sys
    main(sys.argv)
