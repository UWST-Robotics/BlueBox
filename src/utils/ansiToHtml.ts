export default function ansiToHtml(input: string): string {
    const ansiToHtmlMap: { [key: string]: string } = {
        '30': 'color: black',
        '31': 'color: red',
        '32': 'color: green',
        '33': 'color: yellow',
        '34': 'color: blue',
        '35': 'color: magenta',
        '36': 'color: cyan',
        '37': 'color: white',
        '90': 'color: gray',
        '1': 'font-weight: bold'
    };

    return input.replace(/\x1b\[(\d+)(;\d+)?m/g, (_, colorCode: string, extraCode: string) => {
        let style = ansiToHtmlMap[colorCode] || '';

        if (extraCode) {
            const extraColor = extraCode.slice(1);  // Remove the leading semicolon
            style += `; ${ansiToHtmlMap[extraColor] || ''}`;
        }

        return `<span style="${style}">`;
    }).replace(/\x1b\[0m/g, '</span>');  // Close span tags on reset
}