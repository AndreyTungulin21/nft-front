export const sliceText = (text, numSlice, middle = '') => {
    if (text) {
        return text?.slice(0, numSlice) + middle + text?.slice(text.length - numSlice, text.length)
    }

    return ''
}

export const ListenerClick = (root = null, setOpen) => {
    const onClick = e => root.current?.contains(e.target) || setOpen(false);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
}

const getBase64StringFromDataURL = (dataURL) =>
    dataURL.replace('data:', '').replace(/^.+,/, '');


export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const base64 = getBase64StringFromDataURL(reader.result);
        resolve(base64)
    };
});

export const getSizeInMB = sizeInBytes => (sizeInBytes / (1024 * 1024)).toFixed(2);

