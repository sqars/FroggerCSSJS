export default function checkCollision(frogger, obj) {
    let result = false;

    const objLeftSide = obj.posX; // 150
    const objRightSide = obj.posX + obj.width; // 200
    const objTopSide = obj.posY; // 0
    const objBottomSide = obj.posY + obj.height; // 50

    const froggerLeftSide = frogger.posX; // 150
    const froggerRightSide = frogger.posX + frogger.width; // 200
    const froggerTopSide = frogger.posY; // 45
    const froggerBottomSide = frogger.posY + frogger.height; // 95


    if (
        ((froggerRightSide > objLeftSide && froggerRightSide <= objRightSide) ||
         (froggerLeftSide < objRightSide && froggerLeftSide >= objLeftSide)) &&
        (froggerTopSide < objBottomSide && froggerBottomSide > objTopSide)
    ) {
        result = true;
    };
    return result;
}
