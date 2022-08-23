

const gUtilities = {

    isNullOrWhiteSpace: (input: string | null | undefined): boolean => {

        return !input
            || input.match(/^\s*$/) !== null;
    },

    getFileName: (input: string | null | undefined): string => {

        if (gUtilities.isNullOrWhiteSpace(input)) {

            return "";
        }

        return (input as string).replace(/\.[^/.]+$/, "");
    },

    isNumeric: (input: any): boolean => {

        if (gUtilities.isNullOrWhiteSpace(input) === true) {

            return false;
        }

        return !isNaN(input);
    },

    isNegativeNumeric: (input: any): boolean => {

        if (!gUtilities.isNumeric(input)) {

            return false;
        }

        return +input < 0; // + converts a string to a number if it consists only of digits.
    },

    isObjectEmpty: (input: any): boolean => {

        if (input
            && Object.keys(input).length === 0
            && input.constructor === Object) {

            return true;
        }

        return false;
    },

    hasDuplicates: <T>(input: Array<T>): boolean => {

        if (new Set(input).size !== input.length) {

            return true;
        }

        return false;
    },

    extend: <T>(array1: Array<T>, array2: Array<T>): void => {

        array2.forEach((item: T) => {

            array1.push(item);
        });
    },

    prettyPrintJsonFromString: (input: string | null): string => {

        if (!input) {

            return "";
        }

        return gUtilities.prettyPrintJsonFromObject(JSON.parse(input));
    },

    prettyPrintJsonFromObject: (input: object | null): string => {

        if (!input) {

            return "";
        }

        return JSON.stringify(
            input,
            null,
            4 // indented 4 spaces
        );
    },

    isPositiveNumeric: (input: any): boolean => {

        if (!gUtilities.isNumeric(input)) {

            return false;
        }

        return Number(input) >= 0;
    },

    getTime: (): string => {

        const now: Date = new Date(Date.now());
        const time: string = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}::${now.getMilliseconds()}:`;

        return time;
    },

    splitByNewLine: (input: string): Array<string> => {

        if (gUtilities.isNullOrWhiteSpace(input) === true) {

            return [];
        }

        const results = input.split(/[\r\n]+/);
        const cleaned: Array<string> = [];

        results.forEach((value: string) => {

            if (!gUtilities.isNullOrWhiteSpace(value)) {

                cleaned.push(value.trim());
            }
        });

        return cleaned;
    },

    splitByPipe: (input: string): Array<string> => {

        if (gUtilities.isNullOrWhiteSpace(input) === true) {

            return [];
        }

        const results = input.split('|');
        const cleaned: Array<string> = [];

        results.forEach((value: string) => {

            if (!gUtilities.isNullOrWhiteSpace(value)) {

                cleaned.push(value.trim());
            }
        });

        return cleaned;
    },

    splitByNewLineAndOrder: (input: string): Array<string> => {

        return gUtilities
            .splitByNewLine(input)
            .sort();
    },

    joinByNewLine: (input: Array<string>): string => {

        if (!input
            || input.length === 0) {

            return '';
        }

        return input.join('\n');
    },

    removeAllChildren: (parent: Element): void => {

        if (parent !== null) {

            while (parent.firstChild) {

                parent.removeChild(parent.firstChild);
            }
        }
    },

    shortPrintText: (
        input: string,
        maxLength: number = 100): string => {

        if (gUtilities.isNullOrWhiteSpace(input) === true) {

            return '';
        }

        const firstNewLineIndex: number = gUtilities.getFirstNewLineIndex(input);

        if (firstNewLineIndex > 0
            && firstNewLineIndex <= maxLength) {

            const output = input.substr(0, firstNewLineIndex - 1);

            return gUtilities.trimAndAddEllipsis(output);
        }

        if (input.length <= maxLength) {

            return input;
        }

        const output = input.substr(0, maxLength);

        return gUtilities.trimAndAddEllipsis(output);
    },

    trimAndAddEllipsis: (input: string): string => {

        let output: string = input.trim();
        let punctuationRegex: RegExp = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
        let spaceRegex: RegExp = /\W+/g;
        let lastCharacter: string = output[output.length - 1];

        let lastCharacterIsPunctuation: boolean =
            punctuationRegex.test(lastCharacter)
            || spaceRegex.test(lastCharacter);


        while (lastCharacterIsPunctuation === true) {

            output = output.substr(0, output.length - 1);
            lastCharacter = output[output.length - 1];

            lastCharacterIsPunctuation =
                punctuationRegex.test(lastCharacter)
                || spaceRegex.test(lastCharacter);
        }

        return `${output}...`;
    },

    getFirstNewLineIndex: (input: string): number => {

        let character: string;

        for (let i = 0; i < input.length; i++) {

            character = input[i];

            if (character === '\n'
                || character === '\r') {

                return i;
            }
        }

        return -1;
    },

    upperCaseFirstLetter: (input: string): string => {

        return input.charAt(0).toUpperCase() + input.slice(1);
    },

    lowerCaseFirstLetter: (input: string): string => {

        return input.charAt(0).toLowerCase() + input.slice(1);
    },

    generateGuid: (useHypens: boolean = false): string => {

        let d = new Date().getTime();

        let d2 = (performance
            && performance.now
            && (performance.now() * 1000)) || 0;

        let pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

        if (!useHypens) {
            pattern = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx';
        }

        const guid = pattern
            .replace(
                /[xy]/g,
                function (c) {

                    let r = Math.random() * 16;

                    if (d > 0) {

                        r = (d + r) % 16 | 0;
                        d = Math.floor(d / 16);
                    }
                    else {

                        r = (d2 + r) % 16 | 0;
                        d2 = Math.floor(d2 / 16);
                    }

                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                }
            );

        return guid;
    },

    checkArraysEqual: (a: string[], b: string[]): boolean => {

        if (a === b) {

            return true;
        }

        if (a === null
            || b === null) {

            return false;
        }

        if (a.length !== b.length) {

            return false;
        }

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // Please note that calling sort on an array will modify that array.
        // you might want to clone your array first.

        const x: string[] = [...a];
        const y: string[] = [...b];
        
        x.sort();
        y.sort();

        for (let i = 0; i < x.length; i++) {

            if (x[i] !== y[i]) {

                return false;
            }
        }

        return true;
    },

    checkIfChrome: (): boolean => {

        // please note, 
        // that IE11 now returns undefined again for window.chrome
        // and new Opera 30 outputs true for window.chrome
        // but needs to check if window.opr is not undefined
        // and new IE Edge outputs to true now for window.chrome
        // and if not iOS Chrome check
        // so use the below updated condition

        let tsWindow: any = window as any;
        let isChromium = tsWindow.chrome;
        let winNav = window.navigator;
        let vendorName = winNav.vendor;
        let isOpera = typeof tsWindow.opr !== "undefined";
        let isIEedge = winNav.userAgent.indexOf("Edge") > -1;
        let isIOSChrome = winNav.userAgent.match("CriOS");

        if (isIOSChrome) {
            // is Google Chrome on IOS
            return true;
        }
        else if (isChromium !== null
            && typeof isChromium !== "undefined"
            && vendorName === "Google Inc."
            && isOpera === false
            && isIEedge === false) {
            // is Google Chrome
            return true;
        }

        return false;
    }
};

export default gUtilities;