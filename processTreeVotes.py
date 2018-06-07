import os, csv

fileList = ["TreeVotesResults/"+f for f in os.listdir(os.curdir+"/TreeVotesResults") if f > '2018-05-16']

fileList.sort()

timeRankDict = {}
creationDict = {}

for fileName in fileList:
	print(fileName)
	reader = csv.reader(open(fileName, 'rt'))
	for row in reader:
		if len(row) != 10:
			continue
		else:
			try:
				timeRankDict[row[0]]
			except(KeyError):
				timeRankDict[row[0]] = {}
				creationDict[row[0]] = row[1]

			timeRankDict[row[0]][fileName[fileName.index("/")+1:-4]] = row[2]