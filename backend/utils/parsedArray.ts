interface elements {
    [x: string]: any;
    elements?: string[];
  }

 export const parseArray = (elements:elements) => {
    const parsedElements = elements.map((elementsData:string,index:number)=> {
        return JSON.parse(elementsData)
    })
    return parsedElements
}