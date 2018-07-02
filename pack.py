from rectpack import newPacker


class BinSegment:
    def __init__(self, binSeg):
        self.bin = binSeg
        self.count = 1


def AddBinSeg(binSeg):
    for i in range(len(binSolution)):
        if(binSolution[i].bin == binSeg):
            binSolution[i].count += 1
            return
    binSolution.append(BinSegment(binSeg))


def LoadInputRectangles(filePath):
    rects = []
    with open(filePath) as f:
        for line in f:
            (width, height, id) = line.strip().split(",")
            rects.append((int(width), int(height), int(id)))
    return rects


def WriteResult(filePath, binSolution):
    with open(filePath, 'w') as f:
        # write total bin types
        f.writelines(str(len(binSolution)) + "\n")
        for binSeg in binSolution:
            # write(number of rects, number of bins)
            f.writelines(str(len(binSeg.bin)) + "," + str(binSeg.count) + "\n")
            # write rect of bins
            for rect in binSeg.bin:
                # x, y, width, height, rid
                f.writelines(str(rect[0]) + "," + str(rect[1]) + "," + str(rect[2]) +
                             "," + str(rect[3]) + "," + str(rect[4]) + "\n")


binSolution = []
rectangles = LoadInputRectangles("data/sample.in")
bins = [(100, 100, float("inf"))]

packer = newPacker()

# Add the rectangles to packing queue
for r in rectangles:
    packer.add_rect(*r)

# Add the bins where the rectangles will be placed
for b in bins:
    packer.add_bin(*b)

# Start packing
packer.pack()


for abin in packer:
    binSeg = []
    for rect in abin:
        binSeg.append([rect.x, rect.y, rect.width, rect.height, rect.rid])
    binSeg.sort()
    AddBinSeg(binSeg)

binCount = 0
for binSeg in binSolution:
    print binSeg.count
    print binSeg.bin
    print '***********'
    binCount += binSeg.count

actualSize = 0.0
for rect in rectangles:
    actualSize += rect[0] * rect[1]

totalSize = 1.0 * 100 * 100 * binCount

print "ratio = " + str(actualSize / totalSize)

WriteResult("data/sample.out", binSolution)
