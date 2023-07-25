function getrand() {
    let randNum = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    //document.write(randNum);
    return {"data": randNum};
}
