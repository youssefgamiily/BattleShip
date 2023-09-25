const toggleHide = (elemArr) => {
    for (let elem of elemArr) {
        elem.classList.toggle("hide")
    }
}
const parseStringToArrays = (inputString)=> {
    const arrayStrings = inputString.match(/\[[^\]]+\]/g);
  
    if (!arrayStrings) {
      return [];
    }
  
    const arrayOfArrays = arrayStrings.map((str) => {
      const cleanedStr = str.replace(/\[|\]/g, ''); // Remove square brackets
      const arrayValues = cleanedStr.split(',').map((item) => item.trim());
      return arrayValues;
    });
  
    return arrayOfArrays;
  }

export {toggleHide, parseStringToArrays}