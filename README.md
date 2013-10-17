# level-replicate-test

Testing [leveldb](https://github.com/rvagg/levelup) replication using
[level-replicate](https://github.com/dominictarr/level-replicate) for a chat like
application.

## 2 party replication

`A - B`

### Desired output

```
$ node test.js 2
 A id: 1
 A 1382015427441.122: 00
 A 1382015427441.445: 01
 A 1382015427441.535: 02
 A 1382015427441.598: 03
 A 1382015427441.999: 04
 B id: 2
 B 1382015427441.122: 00
 B 1382015427441.445: 01
 B 1382015427441.535: 02
 B 1382015427441.598: 03
 B 1382015427441.999: 04
!A 0
 A 1382015431457: 0
 B 1382015431457: 0
!B 1
 B 1382015433458: 1
 A 1382015433458: 1
!A 2
 A 1382015435462: 2
 B 1382015435462: 2
!B 3
 B 1382015437463: 3
 A 1382015437463: 3
!A 4
 A 1382015439464: 4
 B 1382015439464: 4
```

### Actual output

```bash
$ node test.js 2
 A id: 1
 A 1382015427441.122: 00
 A 1382015427441.445: 01
 A 1382015427441.535: 02
 A 1382015427441.598: 03
 A 1382015427441.999: 04
 B id: 2
!A 0
 A 1382015431457: 0
 B 1382015431457: 0
 A 1382015431457: 0
!B 1
 B 1382015433458: 1
 A 1382015433458: 1
 B 1382015433458: 1
!A 2
 A 1382015435462: 2
 B 1382015435462: 2
 A 1382015435462: 2
!B 3
 B 1382015437463: 3
 A 1382015437463: 3
 B 1382015437463: 3
!A 4
 A 1382015439464: 4
 B 1382015439464: 4
 A 1382015439464: 4
```

## 3 party replication

`A - B - C`

## Desired output

```bash
$ node test.js 3
 A id: 1
 A 1382015571378.0781: 00
 A 1382015571378.8147: 01
 A 1382015571378.9106: 02
 A 1382015571379.2449: 03
 A 1382015571379.9343: 04
 B id: 2
 A 1382015571378.0781: 00
 A 1382015571378.8147: 01
 A 1382015571378.9106: 02
 A 1382015571379.2449: 03
 A 1382015571379.9343: 04
 C id: 3
 A 1382015571378.0781: 00
 A 1382015571378.8147: 01
 A 1382015571378.9106: 02
 A 1382015571379.2449: 03
 A 1382015571379.9343: 04
!A 0
 A 1382015577405: 0
 B 1382015577405: 0
 C 1382015577405: 0
!B 1
 B 1382015579407: 1
 A 1382015579407: 1
 C 1382015579407: 1
!C 2
 C 1382015581407: 2
 B 1382015581407: 2
 A 1382015581407: 2
```

## Actual output

```bash
$ node test.js 3
 A id: 1
 A 1382015571378.0781: 00
 A 1382015571378.8147: 01
 A 1382015571378.9106: 02
 A 1382015571379.2449: 03
 A 1382015571379.9343: 04
 B id: 2
 C id: 3
!A 0
 A 1382015577405: 0
 B 1382015577405: 0
 A 1382015577405: 0
 C 1382015577405: 0
 B 1382015577405: 0
!B 1
 B 1382015579407: 1
 A 1382015579407: 1
 C 1382015579407: 1
 B 1382015579407: 1
 B 1382015579407: 1
!C 2
 C 1382015581407: 2
 B 1382015581407: 2
 A 1382015581407: 2
 C 1382015581407: 2
 B 1382015581407: 2
```
