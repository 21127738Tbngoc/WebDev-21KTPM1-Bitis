function setLinkDisabled(element) {
    element.classList.add("link-disabled");
    element.setAttribute("href", "javascript:void(0)");
}