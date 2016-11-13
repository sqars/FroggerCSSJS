const CollisionDetection = {
    checkCollision: (frogger, obj) => {
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
    },

    findCollision: (frogger, objectsArr) => {
        let result = false;
        for (let i = 0; i < objectsArr.length; i++) {
            if (CollisionDetection.checkCollision(frogger, objectsArr[i])) {
                result = objectsArr[i];
                break;
            }
        };
        return result;
    },

    findTurtleCollision: (frogger, turtlesArr) =>{ // we need this to filter diving turtles
      let result = false;
      let notDivingTurtles = turtlesArr.filter(turtle => !turtle.dived);
      for (let i = 0; i < notDivingTurtles.length; i++) {
          if (CollisionDetection.checkCollision(frogger, notDivingTurtles[i])) {
              result = notDivingTurtles[i];
              break;
          }
      };
      return result;
    },

    checkOutOfMap: (frogger, board) => {
        let result = false;
        if (frogger.posX > board.width - 50 || frogger.posX < 0 ||
            frogger.posY > board.height - 50 || frogger.posY < 0) {
            result = true;
        }
        return result;
    }
}

export default CollisionDetection;
