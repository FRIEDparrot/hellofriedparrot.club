/**
 * map of user priority to identity string
 */
export const userPriorityMap = {
    "-1": "admin",
    "0": "super_manager",
    "1": "manager",
    "2": "SVIP",
    "3": "VIP",
    "4": "user",
    "5": "guest",
    "6": "banned",
};

/**
 * Reverse map of userPriorityMap
 */
export const priorityMap = {
    admin: "-1",
    super_manager: "0",
    manager: "1",
    SVIP: "2",
    VIP: "3",
    user: "4",
    guest: "5",
    banned: "6",
};

export const PriorityBorderColorMap = {
    "-1": "gold", // admin
    0: "blue", // super_manager
    1: "violet", // manager
    2: "red", // SVIP
    3: "orange", // VIP
    4: "green", // user
    5: "var(--sidebar-header-bg-color)", // guest
    6: "var(--sidebar-header-bg-color)", // banned
};

export const PriorityBorderColorContrastMap = {
    "-1": "glod", // admin
    0: "lightblue", // super_manager
    1: "#00CCFF", // manager
    2: "#009933", // SVIP
    3: "#FF9900", // VIP
    4: "#00FF00", // user
    5: "var(--sidebar-header-bg-color)", // guest
    6: "var(--sidebar-header-bg-color)", // banned
};
