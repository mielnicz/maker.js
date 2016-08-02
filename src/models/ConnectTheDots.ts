namespace MakerJs.models {

    export class ConnectTheDots implements IModel {

        public paths: IPathMap = {};

        constructor(numericList: string);

        constructor(coords: number[]);

        constructor(isClosed: boolean, points: IPoint[]);

        constructor(...args: any[]) {

            var isClosed: boolean;
            var points: IPoint[];

            switch (args.length) {
                case 1:
                    isClosed = true;

                    var coords: number[];

                    if (Array.isArray(args[0])) {
                        coords = args[0] as number[];
                    } else {
                        coords = importer.parseNumericList(args[0] as string);
                    }
                    
                    points = [];
                    for (var i = 0; i < coords.length; i += 2) {
                        points.push([coords[i], coords[i + 1]]);
                    }
                    break;

                case 2:
                    isClosed = args[0] as boolean;
                    points = args[1] as IPoint[];
                    break;
            }

            var connect = (a: number, b: number) => {
                this.paths["ShapeLine" + i] = new paths.Line(points[a], points[b]);
            }

            for (var i = 1; i < points.length; i++) {
                connect(i - 1, i);
            }

            if (isClosed && points.length > 2) {
                connect(points.length - 1, 0);
            }
        }
    }

    (<IKit>ConnectTheDots).metaParameters = [
        { title: "closed", type: "bool", value: true },
        {
            title: "points", type: "select", value: [
                [[0, 0], [40, 40], [60, 20], [100, 100], [60, 60], [40, 80]],
                [[0, 0], [100, 0], [50, 87]]
            ]
        }
    ];
}
