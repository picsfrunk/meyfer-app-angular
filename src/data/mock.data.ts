import { Section } from '../models/interfaces.model';

export const MOCK_SECTIONS: Section[] = [
//   {
//     id: 1,
//     title: 'Abrazaderas',
//     image: 'assets/images/abrazadera.png',
//     products: [
//       {
//         id: 101,
//         name: 'Abrazadera Tipo 1',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 11, code: 'AB0101', description: 'Abrazadera 1 - 1"', price: 510 },
//           { id: 12, code: 'AB0102', description: 'Abrazadera 1 - 2"', price: 520 },
//           { id: 13, code: 'AB0103', description: 'Abrazadera 1 - 3"', price: 530 },
//           { id: 14, code: 'AB0104', description: 'Abrazadera 1 - 4"', price: 540 },
//           { id: 15, code: 'AB0105', description: 'Abrazadera 1 - 5"', price: 550 },
//           { id: 16, code: 'AB0106', description: 'Abrazadera 1 - 6"', price: 560 },
//           { id: 17, code: 'AB0107', description: 'Abrazadera 1 - 7"', price: 570 },
//           { id: 18, code: 'AB0108', description: 'Abrazadera 1 - 8"', price: 580 },
//           { id: 19, code: 'AB0109', description: 'Abrazadera 1 - 9"', price: 590 },
//           { id: 20, code: 'AB0110', description: 'Abrazadera 1 - 10"', price: 600 },
//           { id: 20, code: 'AB0110', description: 'Abrazadera 1 - 10"', price: 600 },
//           { id: 20, code: 'AB0110', description: 'Abrazadera 1 - 10"', price: 600 },
//           { id: 20, code: 'AB0110', description: 'Abrazadera 1 - 10"', price: 600 },
//           { id: 20, code: 'AB0110', description: 'Abrazadera 1 - 10"', price: 600 },
//           { id: 20, code: 'AB0110', description: 'Abrazadera 1 - 10"', price: 600 },
//           { id: 20, code: 'AB0110', description: 'Abrazadera 1 - 10"', price: 600 },
//           { id: 20, code: 'AB0110', description: 'Abrazadera 1 - 10"', price: 600 },
//         ]
//       }, {
//         id: 102,
//         name: 'Abrazadera Tipo 2',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 21, code: 'AB0201', description: 'Abrazadera 2 - 1"', price: 520 }, { id: 22, code: 'AB0202', description: 'Abrazadera 2 - 2"', price: 540 }, { id: 23, code: 'AB0203', description: 'Abrazadera 2 - 3"', price: 560 }, { id: 24, code: 'AB0204', description: 'Abrazadera 2 - 4"', price: 580 }, { id: 25, code: 'AB0205', description: 'Abrazadera 2 - 5"', price: 600 }, { id: 26, code: 'AB0206', description: 'Abrazadera 2 - 6"', price: 620 }, { id: 27, code: 'AB0207', description: 'Abrazadera 2 - 7"', price: 640 }, { id: 28, code: 'AB0208', description: 'Abrazadera 2 - 8"', price: 660 }, { id: 29, code: 'AB0209', description: 'Abrazadera 2 - 9"', price: 680 }, { id: 30, code: 'AB0210', description: 'Abrazadera 2 - 10"', price: 700 },
//         ]
//       }, {
//         id: 103,
//         name: 'Abrazadera Tipo 3',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 31, code: 'AB0301', description: 'Abrazadera 3 - 1"', price: 530 }, { id: 32, code: 'AB0302', description: 'Abrazadera 3 - 2"', price: 560 }, { id: 33, code: 'AB0303', description: 'Abrazadera 3 - 3"', price: 590 }, { id: 34, code: 'AB0304', description: 'Abrazadera 3 - 4"', price: 620 }, { id: 35, code: 'AB0305', description: 'Abrazadera 3 - 5"', price: 650 }, { id: 36, code: 'AB0306', description: 'Abrazadera 3 - 6"', price: 680 }, { id: 37, code: 'AB0307', description: 'Abrazadera 3 - 7"', price: 710 }, { id: 38, code: 'AB0308', description: 'Abrazadera 3 - 8"', price: 740 }, { id: 39, code: 'AB0309', description: 'Abrazadera 3 - 9"', price: 770 }, { id: 40, code: 'AB0310', description: 'Abrazadera 3 - 10"', price: 800 },
//         ]
//       }, {
//         id: 104,
//         name: 'Abrazadera Tipo 4',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 41, code: 'AB0401', description: 'Abrazadera 4 - 1"', price: 540 }, { id: 42, code: 'AB0402', description: 'Abrazadera 4 - 2"', price: 580 }, { id: 43, code: 'AB0403', description: 'Abrazadera 4 - 3"', price: 620 }, { id: 44, code: 'AB0404', description: 'Abrazadera 4 - 4"', price: 660 }, { id: 45, code: 'AB0405', description: 'Abrazadera 4 - 5"', price: 700 }, { id: 46, code: 'AB0406', description: 'Abrazadera 4 - 6"', price: 740 }, { id: 47, code: 'AB0407', description: 'Abrazadera 4 - 7"', price: 780 }, { id: 48, code: 'AB0408', description: 'Abrazadera 4 - 8"', price: 820 }, { id: 49, code: 'AB0409', description: 'Abrazadera 4 - 9"', price: 860 }, { id: 50, code: 'AB0410', description: 'Abrazadera 4 - 10"', price: 900 },
//         ]
//       }, {
//         id: 105,
//         name: 'Abrazadera Tipo 5',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 51, code: 'AB0501', description: 'Abrazadera 5 - 1"', price: 550 }, { id: 52, code: 'AB0502', description: 'Abrazadera 5 - 2"', price: 600 }, { id: 53, code: 'AB0503', description: 'Abrazadera 5 - 3"', price: 650 }, { id: 54, code: 'AB0504', description: 'Abrazadera 5 - 4"', price: 700 }, { id: 55, code: 'AB0505', description: 'Abrazadera 5 - 5"', price: 750 }, { id: 56, code: 'AB0506', description: 'Abrazadera 5 - 6"', price: 800 }, { id: 57, code: 'AB0507', description: 'Abrazadera 5 - 7"', price: 850 }, { id: 58, code: 'AB0508', description: 'Abrazadera 5 - 8"', price: 900 }, { id: 59, code: 'AB0509', description: 'Abrazadera 5 - 9"', price: 950 }, { id: 60, code: 'AB0510', description: 'Abrazadera 5 - 10"', price: 1000 },
//         ]
//       }, {
//         id: 106,
//         name: 'Abrazadera Tipo 6',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 61, code: 'AB0601', description: 'Abrazadera 6 - 1"', price: 560 }, { id: 62, code: 'AB0602', description: 'Abrazadera 6 - 2"', price: 620 }, { id: 63, code: 'AB0603', description: 'Abrazadera 6 - 3"', price: 680 }, { id: 64, code: 'AB0604', description: 'Abrazadera 6 - 4"', price: 740 }, { id: 65, code: 'AB0605', description: 'Abrazadera 6 - 5"', price: 800 }, { id: 66, code: 'AB0606', description: 'Abrazadera 6 - 6"', price: 860 }, { id: 67, code: 'AB0607', description: 'Abrazadera 6 - 7"', price: 920 }, { id: 68, code: 'AB0608', description: 'Abrazadera 6 - 8"', price: 980 }, { id: 69, code: 'AB0609', description: 'Abrazadera 6 - 9"', price: 1040 }, { id: 70, code: 'AB0610', description: 'Abrazadera 6 - 10"', price: 1100 },
//         ]
//       }, {
//         id: 107,
//         name: 'Abrazadera Tipo 7',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 71, code: 'AB0701', description: 'Abrazadera 7 - 1"', price: 570 },
//           { id: 72, code: 'AB0702', description: 'Abrazadera 7 - 2"', price: 640 },
//           { id: 73, code: 'AB0703', description: 'Abrazadera 7 - 3"', price: 710 },
//           { id: 74, code: 'AB0704', description: 'Abrazadera 7 - 4"', price: 780 },
//           { id: 75, code: 'AB0705', description: 'Abrazadera 7 - 5"', price: 850 },
//           { id: 76, code: 'AB0706', description: 'Abrazadera 7 - 6"', price: 920 },
//           { id: 77, code: 'AB0707', description: 'Abrazadera 7 - 7"', price: 990 },
//           { id: 78, code: 'AB0708', description: 'Abrazadera 7 - 8"', price: 1060 },
//           { id: 79, code: 'AB0709', description: 'Abrazadera 7 - 9"', price: 1130 },
//           { id: 80, code: 'AB0710', description: 'Abrazadera 7 - 10"', price: 1200 },
//           { id: 80, code: 'AB0710', description: 'Abrazadera 7 - 10"', price: 1200 },
//           { id: 80, code: 'AB0710', description: 'Abrazadera 7 - 10"', price: 1200 },
//           { id: 80, code: 'AB0710', description: 'Abrazadera 7 - 10"', price: 1200 },
//           { id: 80, code: 'AB0710', description: 'Abrazadera 7 - 10"', price: 1200 },
//           { id: 80, code: 'AB0710', description: 'Abrazadera 7 - 10"', price: 1200 },
//           { id: 80, code: 'AB0710', description: 'Abrazadera 7 - 10"', price: 1200 },
//           { id: 80, code: 'AB0710', description: 'Abrazadera 7 - 10"', price: 1200 },
//           { id: 80, code: 'AB0710', description: 'Abrazadera 7 - 10"', price: 1200 },
//           { id: 80, code: 'AB0710', description: 'Abrazadera 7 - 10"', price: 1200 },
//           { id: 80, code: 'AB0710', description: 'Abrazadera 7 - 10"', price: 1200 },
//           { id: 80, code: 'AB0710', description: 'Abrazadera 7 - 10"', price: 1200 },
//           { id: 80, code: 'AB0710', description: 'Abrazadera 7 - 10"', price: 1200 },
//           { id: 80, code: 'AB0710', description: 'Abrazadera 7 - 10"', price: 1200 },
//         ]
//
//       }, {
//         id: 108,
//         name: 'Abrazadera Tipo 8',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 81, code: 'AB0801', description: 'Abrazadera 8 - 1"', price: 580 }, { id: 82, code: 'AB0802', description: 'Abrazadera 8 - 2"', price: 660 }, { id: 83, code: 'AB0803', description: 'Abrazadera 8 - 3"', price: 740 }, { id: 84, code: 'AB0804', description: 'Abrazadera 8 - 4"', price: 820 }, { id: 85, code: 'AB0805', description: 'Abrazadera 8 - 5"', price: 900 }, { id: 86, code: 'AB0806', description: 'Abrazadera 8 - 6"', price: 980 }, { id: 87, code: 'AB0807', description: 'Abrazadera 8 - 7"', price: 1060 }, { id: 88, code: 'AB0808', description: 'Abrazadera 8 - 8"', price: 1140 }, { id: 89, code: 'AB0809', description: 'Abrazadera 8 - 9"', price: 1220 }, { id: 90, code: 'AB0810', description: 'Abrazadera 8 - 10"', price: 1300 },
//         ]
//       }, {
//         id: 109,
//         name: 'Abrazadera Tipo 9',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 91, code: 'AB0901', description: 'Abrazadera 9 - 1"', price: 590 }, { id: 92, code: 'AB0902', description: 'Abrazadera 9 - 2"', price: 680 }, { id: 93, code: 'AB0903', description: 'Abrazadera 9 - 3"', price: 770 }, { id: 94, code: 'AB0904', description: 'Abrazadera 9 - 4"', price: 860 }, { id: 95, code: 'AB0905', description: 'Abrazadera 9 - 5"', price: 950 }, { id: 96, code: 'AB0906', description: 'Abrazadera 9 - 6"', price: 1040 }, { id: 97, code: 'AB0907', description: 'Abrazadera 9 - 7"', price: 1130 }, { id: 98, code: 'AB0908', description: 'Abrazadera 9 - 8"', price: 1220 }, { id: 99, code: 'AB0909', description: 'Abrazadera 9 - 9"', price: 1310 }, { id: 100, code: 'AB0910', description: 'Abrazadera 9 - 10"', price: 1400 },
//         ]
//       }, {
//         id: 1010,
//         name: 'Abrazadera Tipo 10',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 101, code: 'AB1001', description: 'Abrazadera 10 - 1"', price: 600 }, { id: 102, code: 'AB1002', description: 'Abrazadera 10 - 2"', price: 700 }, { id: 103, code: 'AB1003', description: 'Abrazadera 10 - 3"', price: 800 }, { id: 104, code: 'AB1004', description: 'Abrazadera 10 - 4"', price: 900 }, { id: 105, code: 'AB1005', description: 'Abrazadera 10 - 5"', price: 1000 }, { id: 106, code: 'AB1006', description: 'Abrazadera 10 - 6"', price: 1100 }, { id: 107, code: 'AB1007', description: 'Abrazadera 10 - 7"', price: 1200 }, { id: 108, code: 'AB1008', description: 'Abrazadera 10 - 8"', price: 1300 }, { id: 109, code: 'AB1009', description: 'Abrazadera 10 - 9"', price: 1400 }, { id: 110, code: 'AB1010', description: 'Abrazadera 10 - 10"', price: 1500 },
//         ]
//       },
//     ]
//   },
//   {
//     id: 2,
//     title: 'Sanitarios',
//     image: 'assets/images/abrazadera.png',
//     products: [
//       {
//         id: 201,
//         name: 'Sanitario Tipo 1',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 211, code: 'SN0101', description: 'Sanitario 1 - 1"', price: 1020 }, { id: 212, code: 'SN0102', description: 'Sanitario 1 - 2"', price: 1040 }, { id: 213, code: 'SN0103', description: 'Sanitario 1 - 3"', price: 1060 }, { id: 214, code: 'SN0104', description: 'Sanitario 1 - 4"', price: 1080 }, { id: 215, code: 'SN0105', description: 'Sanitario 1 - 5"', price: 1100 }, { id: 216, code: 'SN0106', description: 'Sanitario 1 - 6"', price: 1120 }, { id: 217, code: 'SN0107', description: 'Sanitario 1 - 7"', price: 1140 }, { id: 218, code: 'SN0108', description: 'Sanitario 1 - 8"', price: 1160 }, { id: 219, code: 'SN0109', description: 'Sanitario 1 - 9"', price: 1180 }, { id: 220, code: 'SN0110', description: 'Sanitario 1 - 10"', price: 1200 },
//         ]
//       }, {
//         id: 202,
//         name: 'Sanitario Tipo 2',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 221, code: 'SN0201', description: 'Sanitario 2 - 1"', price: 1040 }, { id: 222, code: 'SN0202', description: 'Sanitario 2 - 2"', price: 1080 }, { id: 223, code: 'SN0203', description: 'Sanitario 2 - 3"', price: 1120 }, { id: 224, code: 'SN0204', description: 'Sanitario 2 - 4"', price: 1160 }, { id: 225, code: 'SN0205', description: 'Sanitario 2 - 5"', price: 1200 }, { id: 226, code: 'SN0206', description: 'Sanitario 2 - 6"', price: 1240 }, { id: 227, code: 'SN0207', description: 'Sanitario 2 - 7"', price: 1280 }, { id: 228, code: 'SN0208', description: 'Sanitario 2 - 8"', price: 1320 }, { id: 229, code: 'SN0209', description: 'Sanitario 2 - 9"', price: 1360 }, { id: 230, code: 'SN0210', description: 'Sanitario 2 - 10"', price: 1400 },
//         ]
//       }, {
//         id: 203,
//         name: 'Sanitario Tipo 3',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 231, code: 'SN0301', description: 'Sanitario 3 - 1"', price: 1060 }, { id: 232, code: 'SN0302', description: 'Sanitario 3 - 2"', price: 1120 }, { id: 233, code: 'SN0303', description: 'Sanitario 3 - 3"', price: 1180 }, { id: 234, code: 'SN0304', description: 'Sanitario 3 - 4"', price: 1240 }, { id: 235, code: 'SN0305', description: 'Sanitario 3 - 5"', price: 1300 }, { id: 236, code: 'SN0306', description: 'Sanitario 3 - 6"', price: 1360 }, { id: 237, code: 'SN0307', description: 'Sanitario 3 - 7"', price: 1420 }, { id: 238, code: 'SN0308', description: 'Sanitario 3 - 8"', price: 1480 }, { id: 239, code: 'SN0309', description: 'Sanitario 3 - 9"', price: 1540 }, { id: 240, code: 'SN0310', description: 'Sanitario 3 - 10"', price: 1600 },
//         ]
//       }, {
//         id: 204,
//         name: 'Sanitario Tipo 4',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 241, code: 'SN0401', description: 'Sanitario 4 - 1"', price: 1080 }, { id: 242, code: 'SN0402', description: 'Sanitario 4 - 2"', price: 1160 }, { id: 243, code: 'SN0403', description: 'Sanitario 4 - 3"', price: 1240 }, { id: 244, code: 'SN0404', description: 'Sanitario 4 - 4"', price: 1320 }, { id: 245, code: 'SN0405', description: 'Sanitario 4 - 5"', price: 1400 }, { id: 246, code: 'SN0406', description: 'Sanitario 4 - 6"', price: 1480 }, { id: 247, code: 'SN0407', description: 'Sanitario 4 - 7"', price: 1560 }, { id: 248, code: 'SN0408', description: 'Sanitario 4 - 8"', price: 1640 }, { id: 249, code: 'SN0409', description: 'Sanitario 4 - 9"', price: 1720 }, { id: 250, code: 'SN0410', description: 'Sanitario 4 - 10"', price: 1800 },
//         ]
//       }, {
//         id: 205,
//         name: 'Sanitario Tipo 5',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 251, code: 'SN0501', description: 'Sanitario 5 - 1"', price: 1100 }, { id: 252, code: 'SN0502', description: 'Sanitario 5 - 2"', price: 1200 }, { id: 253, code: 'SN0503', description: 'Sanitario 5 - 3"', price: 1300 }, { id: 254, code: 'SN0504', description: 'Sanitario 5 - 4"', price: 1400 }, { id: 255, code: 'SN0505', description: 'Sanitario 5 - 5"', price: 1500 }, { id: 256, code: 'SN0506', description: 'Sanitario 5 - 6"', price: 1600 }, { id: 257, code: 'SN0507', description: 'Sanitario 5 - 7"', price: 1700 }, { id: 258, code: 'SN0508', description: 'Sanitario 5 - 8"', price: 1800 }, { id: 259, code: 'SN0509', description: 'Sanitario 5 - 9"', price: 1900 }, { id: 260, code: 'SN0510', description: 'Sanitario 5 - 10"', price: 2000 },
//         ]
//       }, {
//         id: 206,
//         name: 'Sanitario Tipo 6',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 261, code: 'SN0601', description: 'Sanitario 6 - 1"', price: 1120 }, { id: 262, code: 'SN0602', description: 'Sanitario 6 - 2"', price: 1240 }, { id: 263, code: 'SN0603', description: 'Sanitario 6 - 3"', price: 1360 }, { id: 264, code: 'SN0604', description: 'Sanitario 6 - 4"', price: 1480 }, { id: 265, code: 'SN0605', description: 'Sanitario 6 - 5"', price: 1600 }, { id: 266, code: 'SN0606', description: 'Sanitario 6 - 6"', price: 1720 }, { id: 267, code: 'SN0607', description: 'Sanitario 6 - 7"', price: 1840 }, { id: 268, code: 'SN0608', description: 'Sanitario 6 - 8"', price: 1960 }, { id: 269, code: 'SN0609', description: 'Sanitario 6 - 9"', price: 2080 }, { id: 270, code: 'SN0610', description: 'Sanitario 6 - 10"', price: 2200 },
//         ]
//       }, {
//         id: 207,
//         name: 'Sanitario Tipo 7',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 271, code: 'SN0701', description: 'Sanitario 7 - 1"', price: 1140 }, { id: 272, code: 'SN0702', description: 'Sanitario 7 - 2"', price: 1280 }, { id: 273, code: 'SN0703', description: 'Sanitario 7 - 3"', price: 1420 }, { id: 274, code: 'SN0704', description: 'Sanitario 7 - 4"', price: 1560 }, { id: 275, code: 'SN0705', description: 'Sanitario 7 - 5"', price: 1700 }, { id: 276, code: 'SN0706', description: 'Sanitario 7 - 6"', price: 1840 }, { id: 277, code: 'SN0707', description: 'Sanitario 7 - 7"', price: 1980 }, { id: 278, code: 'SN0708', description: 'Sanitario 7 - 8"', price: 2120 }, { id: 279, code: 'SN0709', description: 'Sanitario 7 - 9"', price: 2260 }, { id: 280, code: 'SN0710', description: 'Sanitario 7 - 10"', price: 2400 },
//         ]
//       }, {
//         id: 208,
//         name: 'Sanitario Tipo 8',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 281, code: 'SN0801', description: 'Sanitario 8 - 1"', price: 1160 }, { id: 282, code: 'SN0802', description: 'Sanitario 8 - 2"', price: 1320 }, { id: 283, code: 'SN0803', description: 'Sanitario 8 - 3"', price: 1480 }, { id: 284, code: 'SN0804', description: 'Sanitario 8 - 4"', price: 1640 }, { id: 285, code: 'SN0805', description: 'Sanitario 8 - 5"', price: 1800 }, { id: 286, code: 'SN0806', description: 'Sanitario 8 - 6"', price: 1960 }, { id: 287, code: 'SN0807', description: 'Sanitario 8 - 7"', price: 2120 }, { id: 288, code: 'SN0808', description: 'Sanitario 8 - 8"', price: 2280 }, { id: 289, code: 'SN0809', description: 'Sanitario 8 - 9"', price: 2440 }, { id: 290, code: 'SN0810', description: 'Sanitario 8 - 10"', price: 2600 },
//         ]
//       }, {
//         id: 209,
//         name: 'Sanitario Tipo 9',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 291, code: 'SN0901', description: 'Sanitario 9 - 1"', price: 1180 },
//           { id: 292, code: 'SN0902', description: 'Sanitario 9 - 2"', price: 1360 },
//           { id: 293, code: 'SN0903', description: 'Sanitario 9 - 3"', price: 1540 },
//           { id: 294, code: 'SN0904', description: 'Sanitario 9 - 4"', price: 1720 },
//           { id: 295, code: 'SN0905', description: 'Sanitario 9 - 5"', price: 1900 },
//           { id: 296, code: 'SN0906', description: 'Sanitario 9 - 6"', price: 2080 },
//           { id: 297, code: 'SN0907', description: 'Sanitario 9 - 7"', price: 2260 },
//           { id: 298, code: 'SN0908', description: 'Sanitario 9 - 8"', price: 2440 },
//           { id: 299, code: 'SN0909', description: 'Sanitario 9 - 9"', price: 2620 },
//           { id: 300, code: 'SN0910', description: 'Sanitario 9 - 10"', price: 2800 },
//           { id: 292, code: 'SN0902', description: 'Sanitario 9 - 2"', price: 1360 },
//           { id: 293, code: 'SN0903', description: 'Sanitario 9 - 3"', price: 1540 },
//           { id: 294, code: 'SN0904', description: 'Sanitario 9 - 4"', price: 1720 },
//           { id: 295, code: 'SN0905', description: 'Sanitario 9 - 5"', price: 1900 },
//           { id: 296, code: 'SN0906', description: 'Sanitario 9 - 6"', price: 2080 },
//           { id: 297, code: 'SN0907', description: 'Sanitario 9 - 7"', price: 2260 },
//           { id: 298, code: 'SN0908', description: 'Sanitario 9 - 8"', price: 2440 },
//           { id: 299, code: 'SN0909', description: 'Sanitario 9 - 9"', price: 2620 },
//           { id: 300, code: 'SN0910', description: 'Sanitario 9 - 10"', price: 2800 },
//         ]
//       }, {
//         id: 2010,
//         name: 'Sanitario Tipo 10',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 301, code: 'SN1001', description: 'Sanitario 10 - 1"', price: 1200 }, { id: 302, code: 'SN1002', description: 'Sanitario 10 - 2"', price: 1400 }, { id: 303, code: 'SN1003', description: 'Sanitario 10 - 3"', price: 1600 }, { id: 304, code: 'SN1004', description: 'Sanitario 10 - 4"', price: 1800 }, { id: 305, code: 'SN1005', description: 'Sanitario 10 - 5"', price: 2000 }, { id: 306, code: 'SN1006', description: 'Sanitario 10 - 6"', price: 2200 }, { id: 307, code: 'SN1007', description: 'Sanitario 10 - 7"', price: 2400 }, { id: 308, code: 'SN1008', description: 'Sanitario 10 - 8"', price: 2600 }, { id: 309, code: 'SN1009', description: 'Sanitario 10 - 9"', price: 2800 }, { id: 310, code: 'SN1010', description: 'Sanitario 10 - 10"', price: 3000 },
//         ]
//       },
//     ]
//   },
//   {
//     id: 2,
//     title: 'Sanitarios',
//     image: 'assets/images/abrazadera.png',
//     products: [
//       {
//         id: 201,
//         name: 'Sanitario Tipo 1',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 211, code: 'SN0101', description: 'Sanitario 1 - 1"', price: 1020 }, { id: 212, code: 'SN0102', description: 'Sanitario 1 - 2"', price: 1040 }, { id: 213, code: 'SN0103', description: 'Sanitario 1 - 3"', price: 1060 }, { id: 214, code: 'SN0104', description: 'Sanitario 1 - 4"', price: 1080 }, { id: 215, code: 'SN0105', description: 'Sanitario 1 - 5"', price: 1100 }, { id: 216, code: 'SN0106', description: 'Sanitario 1 - 6"', price: 1120 }, { id: 217, code: 'SN0107', description: 'Sanitario 1 - 7"', price: 1140 }, { id: 218, code: 'SN0108', description: 'Sanitario 1 - 8"', price: 1160 }, { id: 219, code: 'SN0109', description: 'Sanitario 1 - 9"', price: 1180 }, { id: 220, code: 'SN0110', description: 'Sanitario 1 - 10"', price: 1200 },
//         ]
//       }, {
//         id: 202,
//         name: 'Sanitario Tipo 2',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 221, code: 'SN0201', description: 'Sanitario 2 - 1"', price: 1040 }, { id: 222, code: 'SN0202', description: 'Sanitario 2 - 2"', price: 1080 }, { id: 223, code: 'SN0203', description: 'Sanitario 2 - 3"', price: 1120 }, { id: 224, code: 'SN0204', description: 'Sanitario 2 - 4"', price: 1160 }, { id: 225, code: 'SN0205', description: 'Sanitario 2 - 5"', price: 1200 }, { id: 226, code: 'SN0206', description: 'Sanitario 2 - 6"', price: 1240 }, { id: 227, code: 'SN0207', description: 'Sanitario 2 - 7"', price: 1280 }, { id: 228, code: 'SN0208', description: 'Sanitario 2 - 8"', price: 1320 }, { id: 229, code: 'SN0209', description: 'Sanitario 2 - 9"', price: 1360 }, { id: 230, code: 'SN0210', description: 'Sanitario 2 - 10"', price: 1400 },
//         ]
//       }, {
//         id: 203,
//         name: 'Sanitario Tipo 3',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 231, code: 'SN0301', description: 'Sanitario 3 - 1"', price: 1060 }, { id: 232, code: 'SN0302', description: 'Sanitario 3 - 2"', price: 1120 }, { id: 233, code: 'SN0303', description: 'Sanitario 3 - 3"', price: 1180 }, { id: 234, code: 'SN0304', description: 'Sanitario 3 - 4"', price: 1240 }, { id: 235, code: 'SN0305', description: 'Sanitario 3 - 5"', price: 1300 }, { id: 236, code: 'SN0306', description: 'Sanitario 3 - 6"', price: 1360 }, { id: 237, code: 'SN0307', description: 'Sanitario 3 - 7"', price: 1420 }, { id: 238, code: 'SN0308', description: 'Sanitario 3 - 8"', price: 1480 }, { id: 239, code: 'SN0309', description: 'Sanitario 3 - 9"', price: 1540 }, { id: 240, code: 'SN0310', description: 'Sanitario 3 - 10"', price: 1600 },
//         ]
//       }, {
//         id: 204,
//         name: 'Sanitario Tipo 4',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 241, code: 'SN0401', description: 'Sanitario 4 - 1"', price: 1080 }, { id: 242, code: 'SN0402', description: 'Sanitario 4 - 2"', price: 1160 }, { id: 243, code: 'SN0403', description: 'Sanitario 4 - 3"', price: 1240 }, { id: 244, code: 'SN0404', description: 'Sanitario 4 - 4"', price: 1320 }, { id: 245, code: 'SN0405', description: 'Sanitario 4 - 5"', price: 1400 }, { id: 246, code: 'SN0406', description: 'Sanitario 4 - 6"', price: 1480 }, { id: 247, code: 'SN0407', description: 'Sanitario 4 - 7"', price: 1560 }, { id: 248, code: 'SN0408', description: 'Sanitario 4 - 8"', price: 1640 }, { id: 249, code: 'SN0409', description: 'Sanitario 4 - 9"', price: 1720 }, { id: 250, code: 'SN0410', description: 'Sanitario 4 - 10"', price: 1800 },
//         ]
//       }, {
//         id: 205,
//         name: 'Sanitario Tipo 5',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 251, code: 'SN0501', description: 'Sanitario 5 - 1"', price: 1100 }, { id: 252, code: 'SN0502', description: 'Sanitario 5 - 2"', price: 1200 }, { id: 253, code: 'SN0503', description: 'Sanitario 5 - 3"', price: 1300 }, { id: 254, code: 'SN0504', description: 'Sanitario 5 - 4"', price: 1400 }, { id: 255, code: 'SN0505', description: 'Sanitario 5 - 5"', price: 1500 }, { id: 256, code: 'SN0506', description: 'Sanitario 5 - 6"', price: 1600 }, { id: 257, code: 'SN0507', description: 'Sanitario 5 - 7"', price: 1700 }, { id: 258, code: 'SN0508', description: 'Sanitario 5 - 8"', price: 1800 }, { id: 259, code: 'SN0509', description: 'Sanitario 5 - 9"', price: 1900 }, { id: 260, code: 'SN0510', description: 'Sanitario 5 - 10"', price: 2000 },
//         ]
//       }, {
//         id: 206,
//         name: 'Sanitario Tipo 6',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 261, code: 'SN0601', description: 'Sanitario 6 - 1"', price: 1120 }, { id: 262, code: 'SN0602', description: 'Sanitario 6 - 2"', price: 1240 }, { id: 263, code: 'SN0603', description: 'Sanitario 6 - 3"', price: 1360 }, { id: 264, code: 'SN0604', description: 'Sanitario 6 - 4"', price: 1480 }, { id: 265, code: 'SN0605', description: 'Sanitario 6 - 5"', price: 1600 }, { id: 266, code: 'SN0606', description: 'Sanitario 6 - 6"', price: 1720 }, { id: 267, code: 'SN0607', description: 'Sanitario 6 - 7"', price: 1840 }, { id: 268, code: 'SN0608', description: 'Sanitario 6 - 8"', price: 1960 }, { id: 269, code: 'SN0609', description: 'Sanitario 6 - 9"', price: 2080 }, { id: 270, code: 'SN0610', description: 'Sanitario 6 - 10"', price: 2200 },
//         ]
//       }, {
//         id: 207,
//         name: 'Sanitario Tipo 7',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 271, code: 'SN0701', description: 'Sanitario 7 - 1"', price: 1140 }, { id: 272, code: 'SN0702', description: 'Sanitario 7 - 2"', price: 1280 }, { id: 273, code: 'SN0703', description: 'Sanitario 7 - 3"', price: 1420 }, { id: 274, code: 'SN0704', description: 'Sanitario 7 - 4"', price: 1560 }, { id: 275, code: 'SN0705', description: 'Sanitario 7 - 5"', price: 1700 }, { id: 276, code: 'SN0706', description: 'Sanitario 7 - 6"', price: 1840 }, { id: 277, code: 'SN0707', description: 'Sanitario 7 - 7"', price: 1980 }, { id: 278, code: 'SN0708', description: 'Sanitario 7 - 8"', price: 2120 }, { id: 279, code: 'SN0709', description: 'Sanitario 7 - 9"', price: 2260 }, { id: 280, code: 'SN0710', description: 'Sanitario 7 - 10"', price: 2400 },
//         ]
//       }, {
//         id: 208,
//         name: 'Sanitario Tipo 8',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 281, code: 'SN0801', description: 'Sanitario 8 - 1"', price: 1160 }, { id: 282, code: 'SN0802', description: 'Sanitario 8 - 2"', price: 1320 }, { id: 283, code: 'SN0803', description: 'Sanitario 8 - 3"', price: 1480 }, { id: 284, code: 'SN0804', description: 'Sanitario 8 - 4"', price: 1640 }, { id: 285, code: 'SN0805', description: 'Sanitario 8 - 5"', price: 1800 }, { id: 286, code: 'SN0806', description: 'Sanitario 8 - 6"', price: 1960 }, { id: 287, code: 'SN0807', description: 'Sanitario 8 - 7"', price: 2120 }, { id: 288, code: 'SN0808', description: 'Sanitario 8 - 8"', price: 2280 }, { id: 289, code: 'SN0809', description: 'Sanitario 8 - 9"', price: 2440 }, { id: 290, code: 'SN0810', description: 'Sanitario 8 - 10"', price: 2600 },
//         ]
//       }, {
//         id: 209,
//         name: 'Sanitario Tipo 9',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 291, code: 'SN0901', description: 'Sanitario 9 - 1"', price: 1180 }, { id: 292, code: 'SN0902', description: 'Sanitario 9 - 2"', price: 1360 }, { id: 293, code: 'SN0903', description: 'Sanitario 9 - 3"', price: 1540 }, { id: 294, code: 'SN0904', description: 'Sanitario 9 - 4"', price: 1720 }, { id: 295, code: 'SN0905', description: 'Sanitario 9 - 5"', price: 1900 }, { id: 296, code: 'SN0906', description: 'Sanitario 9 - 6"', price: 2080 }, { id: 297, code: 'SN0907', description: 'Sanitario 9 - 7"', price: 2260 }, { id: 298, code: 'SN0908', description: 'Sanitario 9 - 8"', price: 2440 }, { id: 299, code: 'SN0909', description: 'Sanitario 9 - 9"', price: 2620 }, { id: 300, code: 'SN0910', description: 'Sanitario 9 - 10"', price: 2800 },
//         ]
//       }, {
//         id: 2010,
//         name: 'Sanitario Tipo 10',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 301, code: 'SN1001', description: 'Sanitario 10 - 1"', price: 1200 }, { id: 302, code: 'SN1002', description: 'Sanitario 10 - 2"', price: 1400 }, { id: 303, code: 'SN1003', description: 'Sanitario 10 - 3"', price: 1600 }, { id: 304, code: 'SN1004', description: 'Sanitario 10 - 4"', price: 1800 }, { id: 305, code: 'SN1005', description: 'Sanitario 10 - 5"', price: 2000 }, { id: 306, code: 'SN1006', description: 'Sanitario 10 - 6"', price: 2200 }, { id: 307, code: 'SN1007', description: 'Sanitario 10 - 7"', price: 2400 }, { id: 308, code: 'SN1008', description: 'Sanitario 10 - 8"', price: 2600 }, { id: 309, code: 'SN1009', description: 'Sanitario 10 - 9"', price: 2800 }, { id: 310, code: 'SN1010', description: 'Sanitario 10 - 10"', price: 3000 },
//         ]
//       },
//     ]
//   },
//   {
//     id: 2,
//     title: 'Sanitarios',
//     image: 'assets/images/abrazadera.png',
//     products: [
//       {
//         id: 201,
//         name: 'Sanitario Tipo 1',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 211, code: 'SN0101', description: 'Sanitario 1 - 1"', price: 1020 }, { id: 212, code: 'SN0102', description: 'Sanitario 1 - 2"', price: 1040 }, { id: 213, code: 'SN0103', description: 'Sanitario 1 - 3"', price: 1060 }, { id: 214, code: 'SN0104', description: 'Sanitario 1 - 4"', price: 1080 }, { id: 215, code: 'SN0105', description: 'Sanitario 1 - 5"', price: 1100 }, { id: 216, code: 'SN0106', description: 'Sanitario 1 - 6"', price: 1120 }, { id: 217, code: 'SN0107', description: 'Sanitario 1 - 7"', price: 1140 }, { id: 218, code: 'SN0108', description: 'Sanitario 1 - 8"', price: 1160 }, { id: 219, code: 'SN0109', description: 'Sanitario 1 - 9"', price: 1180 }, { id: 220, code: 'SN0110', description: 'Sanitario 1 - 10"', price: 1200 },
//         ]
//       }, {
//         id: 202,
//         name: 'Sanitario Tipo 2',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 221, code: 'SN0201', description: 'Sanitario 2 - 1"', price: 1040 }, { id: 222, code: 'SN0202', description: 'Sanitario 2 - 2"', price: 1080 }, { id: 223, code: 'SN0203', description: 'Sanitario 2 - 3"', price: 1120 }, { id: 224, code: 'SN0204', description: 'Sanitario 2 - 4"', price: 1160 }, { id: 225, code: 'SN0205', description: 'Sanitario 2 - 5"', price: 1200 }, { id: 226, code: 'SN0206', description: 'Sanitario 2 - 6"', price: 1240 }, { id: 227, code: 'SN0207', description: 'Sanitario 2 - 7"', price: 1280 }, { id: 228, code: 'SN0208', description: 'Sanitario 2 - 8"', price: 1320 }, { id: 229, code: 'SN0209', description: 'Sanitario 2 - 9"', price: 1360 }, { id: 230, code: 'SN0210', description: 'Sanitario 2 - 10"', price: 1400 },
//         ]
//       }, {
//         id: 203,
//         name: 'Sanitario Tipo 3',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 231, code: 'SN0301', description: 'Sanitario 3 - 1"', price: 1060 }, { id: 232, code: 'SN0302', description: 'Sanitario 3 - 2"', price: 1120 }, { id: 233, code: 'SN0303', description: 'Sanitario 3 - 3"', price: 1180 }, { id: 234, code: 'SN0304', description: 'Sanitario 3 - 4"', price: 1240 }, { id: 235, code: 'SN0305', description: 'Sanitario 3 - 5"', price: 1300 }, { id: 236, code: 'SN0306', description: 'Sanitario 3 - 6"', price: 1360 }, { id: 237, code: 'SN0307', description: 'Sanitario 3 - 7"', price: 1420 }, { id: 238, code: 'SN0308', description: 'Sanitario 3 - 8"', price: 1480 }, { id: 239, code: 'SN0309', description: 'Sanitario 3 - 9"', price: 1540 }, { id: 240, code: 'SN0310', description: 'Sanitario 3 - 10"', price: 1600 },
//         ]
//       }, {
//         id: 204,
//         name: 'Sanitario Tipo 4',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 241, code: 'SN0401', description: 'Sanitario 4 - 1"', price: 1080 }, { id: 242, code: 'SN0402', description: 'Sanitario 4 - 2"', price: 1160 }, { id: 243, code: 'SN0403', description: 'Sanitario 4 - 3"', price: 1240 }, { id: 244, code: 'SN0404', description: 'Sanitario 4 - 4"', price: 1320 }, { id: 245, code: 'SN0405', description: 'Sanitario 4 - 5"', price: 1400 }, { id: 246, code: 'SN0406', description: 'Sanitario 4 - 6"', price: 1480 }, { id: 247, code: 'SN0407', description: 'Sanitario 4 - 7"', price: 1560 }, { id: 248, code: 'SN0408', description: 'Sanitario 4 - 8"', price: 1640 }, { id: 249, code: 'SN0409', description: 'Sanitario 4 - 9"', price: 1720 }, { id: 250, code: 'SN0410', description: 'Sanitario 4 - 10"', price: 1800 },
//         ]
//       }, {
//         id: 205,
//         name: 'Sanitario Tipo 5',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 251, code: 'SN0501', description: 'Sanitario 5 - 1"', price: 1100 }, { id: 252, code: 'SN0502', description: 'Sanitario 5 - 2"', price: 1200 }, { id: 253, code: 'SN0503', description: 'Sanitario 5 - 3"', price: 1300 }, { id: 254, code: 'SN0504', description: 'Sanitario 5 - 4"', price: 1400 }, { id: 255, code: 'SN0505', description: 'Sanitario 5 - 5"', price: 1500 }, { id: 256, code: 'SN0506', description: 'Sanitario 5 - 6"', price: 1600 }, { id: 257, code: 'SN0507', description: 'Sanitario 5 - 7"', price: 1700 }, { id: 258, code: 'SN0508', description: 'Sanitario 5 - 8"', price: 1800 }, { id: 259, code: 'SN0509', description: 'Sanitario 5 - 9"', price: 1900 }, { id: 260, code: 'SN0510', description: 'Sanitario 5 - 10"', price: 2000 },
//         ]
//       }, {
//         id: 206,
//         name: 'Sanitario Tipo 6',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 261, code: 'SN0601', description: 'Sanitario 6 - 1"', price: 1120 }, { id: 262, code: 'SN0602', description: 'Sanitario 6 - 2"', price: 1240 }, { id: 263, code: 'SN0603', description: 'Sanitario 6 - 3"', price: 1360 }, { id: 264, code: 'SN0604', description: 'Sanitario 6 - 4"', price: 1480 }, { id: 265, code: 'SN0605', description: 'Sanitario 6 - 5"', price: 1600 }, { id: 266, code: 'SN0606', description: 'Sanitario 6 - 6"', price: 1720 }, { id: 267, code: 'SN0607', description: 'Sanitario 6 - 7"', price: 1840 }, { id: 268, code: 'SN0608', description: 'Sanitario 6 - 8"', price: 1960 }, { id: 269, code: 'SN0609', description: 'Sanitario 6 - 9"', price: 2080 }, { id: 270, code: 'SN0610', description: 'Sanitario 6 - 10"', price: 2200 },
//           { id: 261, code: 'SN0601', description: 'Sanitario 6 - 1"', price: 1120 }, { id: 262, code: 'SN0602', description: 'Sanitario 6 - 2"', price: 1240 }, { id: 263, code: 'SN0603', description: 'Sanitario 6 - 3"', price: 1360 }, { id: 264, code: 'SN0604', description: 'Sanitario 6 - 4"', price: 1480 }, { id: 265, code: 'SN0605', description: 'Sanitario 6 - 5"', price: 1600 }, { id: 266, code: 'SN0606', description: 'Sanitario 6 - 6"', price: 1720 }, { id: 267, code: 'SN0607', description: 'Sanitario 6 - 7"', price: 1840 }, { id: 268, code: 'SN0608', description: 'Sanitario 6 - 8"', price: 1960 }, { id: 269, code: 'SN0609', description: 'Sanitario 6 - 9"', price: 2080 }, { id: 270, code: 'SN0610', description: 'Sanitario 6 - 10"', price: 2200 },
//         ]
//       }, {
//         id: 207,
//         name: 'Sanitario Tipo 7',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 271, code: 'SN0701', description: 'Sanitario 7 - 1"', price: 1140 }, { id: 272, code: 'SN0702', description: 'Sanitario 7 - 2"', price: 1280 }, { id: 273, code: 'SN0703', description: 'Sanitario 7 - 3"', price: 1420 }, { id: 274, code: 'SN0704', description: 'Sanitario 7 - 4"', price: 1560 }, { id: 275, code: 'SN0705', description: 'Sanitario 7 - 5"', price: 1700 }, { id: 276, code: 'SN0706', description: 'Sanitario 7 - 6"', price: 1840 }, { id: 277, code: 'SN0707', description: 'Sanitario 7 - 7"', price: 1980 }, { id: 278, code: 'SN0708', description: 'Sanitario 7 - 8"', price: 2120 }, { id: 279, code: 'SN0709', description: 'Sanitario 7 - 9"', price: 2260 }, { id: 280, code: 'SN0710', description: 'Sanitario 7 - 10"', price: 2400 },
//         ]
//       }, {
//         id: 208,
//         name: 'Sanitario Tipo 8',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 281, code: 'SN0801', description: 'Sanitario 8 - 1"', price: 1160 }, { id: 282, code: 'SN0802', description: 'Sanitario 8 - 2"', price: 1320 }, { id: 283, code: 'SN0803', description: 'Sanitario 8 - 3"', price: 1480 }, { id: 284, code: 'SN0804', description: 'Sanitario 8 - 4"', price: 1640 }, { id: 285, code: 'SN0805', description: 'Sanitario 8 - 5"', price: 1800 }, { id: 286, code: 'SN0806', description: 'Sanitario 8 - 6"', price: 1960 }, { id: 287, code: 'SN0807', description: 'Sanitario 8 - 7"', price: 2120 }, { id: 288, code: 'SN0808', description: 'Sanitario 8 - 8"', price: 2280 }, { id: 289, code: 'SN0809', description: 'Sanitario 8 - 9"', price: 2440 }, { id: 290, code: 'SN0810', description: 'Sanitario 8 - 10"', price: 2600 },
//         ]
//       }, {
//         id: 209,
//         name: 'Sanitario Tipo 9',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 291, code: 'SN0901', description: 'Sanitario 9 - 1"', price: 1180 }, { id: 292, code: 'SN0902', description: 'Sanitario 9 - 2"', price: 1360 }, { id: 293, code: 'SN0903', description: 'Sanitario 9 - 3"', price: 1540 }, { id: 294, code: 'SN0904', description: 'Sanitario 9 - 4"', price: 1720 }, { id: 295, code: 'SN0905', description: 'Sanitario 9 - 5"', price: 1900 }, { id: 296, code: 'SN0906', description: 'Sanitario 9 - 6"', price: 2080 }, { id: 297, code: 'SN0907', description: 'Sanitario 9 - 7"', price: 2260 }, { id: 298, code: 'SN0908', description: 'Sanitario 9 - 8"', price: 2440 }, { id: 299, code: 'SN0909', description: 'Sanitario 9 - 9"', price: 2620 }, { id: 300, code: 'SN0910', description: 'Sanitario 9 - 10"', price: 2800 },
//         ]
//       }, {
//         id: 2010,
//         name: 'Sanitario Tipo 10',
//         image: 'assets/images/abrazadera.png',
//         items: [
//           { id: 301, code: 'SN1001', description: 'Sanitario 10 - 1"', price: 1200 }, { id: 302, code: 'SN1002', description: 'Sanitario 10 - 2"', price: 1400 }, { id: 303, code: 'SN1003', description: 'Sanitario 10 - 3"', price: 1600 }, { id: 304, code: 'SN1004', description: 'Sanitario 10 - 4"', price: 1800 }, { id: 305, code: 'SN1005', description: 'Sanitario 10 - 5"', price: 2000 }, { id: 306, code: 'SN1006', description: 'Sanitario 10 - 6"', price: 2200 }, { id: 307, code: 'SN1007', description: 'Sanitario 10 - 7"', price: 2400 }, { id: 308, code: 'SN1008', description: 'Sanitario 10 - 8"', price: 2600 }, { id: 309, code: 'SN1009', description: 'Sanitario 10 - 9"', price: 2800 }, { id: 310, code: 'SN1010', description: 'Sanitario 10 - 10"', price: 3000 },
//         ]
//       },
//     ]
//   }
];
