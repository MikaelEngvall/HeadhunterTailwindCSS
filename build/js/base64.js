// Define the utf8_to_b64 function to encode a string to base64
function utf8_to_b64(str) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    return btoa(String.fromCharCode(...bytes));
}
