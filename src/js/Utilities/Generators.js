const Generators = {
    generateSpeed: (width, level) => {
        return Math.sqrt(width * 1/100) + Math.sqrt(Math.pow(level, 3)/width);
    }
};

export default Generators;
