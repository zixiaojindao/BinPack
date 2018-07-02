a = [[1, 4, 3], [1, 3, 4]]
b = [[4, 3, 2], [1, 2, 3]]

a.sort()
b.sort()
print a
print b
print a == b

c = (1, 2, 3)
print c[0]


rects = [(100, 30, 1), (40, 60, 2), (30, 30, 3),
         (70, 70, 4), (100, 50, 5), (30, 30, 6)]
rectangles = []
for i in range(1, 1000):
    rectangles.extend(rects)
