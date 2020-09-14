function resizeGridItem(item) {
    const grid = document.getElementsByClassName("masonry")[0];
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const rowSpan = Math.ceil((item.querySelector('.portfolio-card').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGridItems() {
    const allItems = document.getElementsByClassName("portfolio-wrapper");
    for (let x = 0; x < allItems.length; x++) {
        resizeGridItem(allItems[x]);
    }
}

function resizeInstance(instance) {
    item = instance.elements[0];
    resizeGridItem(item);
}

window.onload = resizeAllGridItems;
window.addEventListener("resize", resizeAllGridItems);

const allItems = document.getElementsByClassName("portfolio-wrapper");
for (let x = 0; x < allItems.length; x++) {
    imagesLoaded(allItems[x], resizeInstance);
}