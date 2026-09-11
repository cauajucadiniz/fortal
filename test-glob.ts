const modules = import.meta.glob('/src/assets/*.{png,jpg,jpeg,svg}', { eager: true });
console.log(modules);
