"use strict";
exports.__esModule = true;
exports.PriorityBorderColorContrastMap = exports.PriorityBorderColorMap = exports.priorityMap = exports.userPriorityMap = void 0;
/**
 * map of user priority to identity string
 */
exports.userPriorityMap = {
    "-1": "admin",
    "0": "super_manager",
    "1": "manager",
    "2": "SVIP",
    "3": "VIP",
    "4": "user",
    "5": "guest",
    "6": "banned"
};
/**
 * Reverse map of userPriorityMap
 */
exports.priorityMap = {
    admin: "-1",
    super_manager: "0",
    manager: "1",
    SVIP: "2",
    VIP: "3",
    user: "4",
    guest: "5",
    banned: "6"
};
exports.PriorityBorderColorMap = {
    "-1": "gold",
    0: "blue",
    1: "violet",
    2: "red",
    3: "orange",
    4: "green",
    5: "var(--sidebar-header-bg-color)",
    6: "var(--sidebar-header-bg-color)"
};
exports.PriorityBorderColorContrastMap = {
    "-1": "glod",
    0: "lightblue",
    1: "#00CCFF",
    2: "#009933",
    3: "#FF9900",
    4: "#00FF00",
    5: "var(--sidebar-header-bg-color)",
    6: "var(--sidebar-header-bg-color)"
};
