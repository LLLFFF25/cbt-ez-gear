const classNames = [ // Datacenter Class Names
    'warrior',      // 0 phys
    'lancer',       // 1 phys
    'slayer',       // 2 phys
    'berserker',    // 3 phys
    'sorcerer',     // 4 mag
    'archer',       // 5 phys
    'priest',       // 6 mag
    'elementalist', // 7 mag
    'soulless',     // 8 mag
    'engineer',     // 9 mag
    'fighter',      // 10 phys
    'assassin',     // 11 mag
    'glaiver'       // 12 phys
];

const classGear = {
    'warrior': [290473, 290486, 290487, 290488],
    'lancer': [290470, 290480, 290481, 290482],
    'slayer': [290471, 290486, 290487, 290488],
    'berserker': [290468, 290480, 290481, 290482],
    'sorcerer': [290479, 290492, 290493, 290494],
    'archer': [290467, 290486, 290487, 290488],
    'priest': [290477, 290492, 290493, 290494],
    'elementalist': [290475, 290492, 290493, 290494],
    'soulless': [290478, 290489, 290490, 290491],
    'engineer': [290474, 290483, 290484, 290485],
    'fighter': [290469, 290480, 290481, 290482],
    'assassin': [290476, 290492, 290493, 290494],
    'glaiver': [290472, 290486, 290487, 290488]
};

module.exports = function ezGear(mod) {

    // New char commands
    let new_char = [
        "perfect_level 70",
        "increaseinvensize 120",
        "perfect_skillpolishing", // Delay after this cause it lags
        "makeplaytestitem 0 15",

        "makeitem 290990 10000", // potion
        "makeitem 290991 10000", // potion
        "makeitem 281012 10000", // contributor coin

        // bis etching V
        "makeitem 293100 10",
        "makeitem 293101 10",
        "makeitem 293102 10",
        "makeitem 293103 10",

        // space-time relics
        "makeitem 290568 2",
        "makeitem 290569 2",
        "makeitem 290570 2",

        // mount
        "makeitem 88737 1", // mount accel I
        "makeitem 88738 1", // mount accel II
        "makeitem 88739 1", // mount accel III

        // 2x Pocket Tabs
        "makeitem 99207 2", // pocket tab
        "makeitem 99205 240", // pocket tab exp

        // accessories
        "makeitem 291088 120", // circlet upgrade
        "makeitem 291089 180", // earring upgrade
        "makeitem 291097 10000", // duality gems
        "makeitem 291094 1000", // Brooch scroll
        "makeitem 291095 1000", // belt scroll
        "makeitem 291096 1000", // mask scroll

        "makeitem 290682 99999" // mythic veil infusion
    ];

    let new_acc = [
        "makeitem 155503 1", // club (some people didn't get it on acc creation)
        "makeitem 246359 1000", // astrum
        "makeitem 139091 21", // character slots
        "makeitem 139092 7", // bank slots
        "makeitem 155047 3", // wardrobe slots
        "makeitem 283401 99999" // water lilies
    ];

    
    mod.command.add('ezgear', (cmd, x) => {
        switch (cmd) {
            case 'new':
                newChar();
                break;
            case 'gear':
                sendGear(x);
                break;
            case 'newacc':
                newAcc();
                break;
            default:
                mod.command.message('Usage: ezgear [new|gear|newacc] [enchancement level]');
                break;
        }
    });

    // Send Admin Command
    function sendAdminCommand(messages, delayInc) {
        let delay = 0;
        messages.forEach((message) => {
            setTimeout(() => {
                mod.send("C_ADMIN", 1, {
                    command: message
                });
            }, delay);
            delay += delayInc; // 0.5s delay
        });
    }
    

    function newChar() {
        let adminCommands = new_char.slice(0);

        // differentiate phys mag class
        // Belt Brooch Mask
        // Innerwear
        if (['warrior', 'lancer', 'slayer', 'berserker', 'archer', 'fighter', 'glaiver'].includes(mod.game.me.class)) { // phys class
            adminCommands.push("makeitem 293007 1");
            adminCommands.push("makeitem 293009 1");
            adminCommands.push("makeitem 293011 1");
            
            adminCommands.push("makeitem 290495 1"); // inner
        } else { // mag class
            adminCommands.push("makeitem 293008 1");
            adminCommands.push("makeitem 293010 1");
            adminCommands.push("makeitem 293012 1");
    
            adminCommands.push("makeitem 290496 1"); // inner
        }

        // send first 3 commands
        sendAdminCommand(adminCommands.slice(0, 3), 250);
        // delay 2s
        setTimeout(() => {
            // send rest of commands
            sendAdminCommand(adminCommands.slice(3), 250);
        }, 2000);
    }

    function sendGear(level) {
        if (level < 0 || level > 10000) {
            mod.command.message('Keep enhancement level between 0 and 10000!');
            return;
        }

        let gear = classGear[mod.game.me.class];
        if (!gear) {
            mod.command.message('No gear found for this class!');
            return;
        }
        let messages = [];
        for (let i = 0; i < gear.length; i++) {
            messages.push(`makeitem ${gear[i]} 1 ${level}`);
        }
        sendAdminCommand(messages, 250);
    }

    function newAcc(){
        sendAdminCommand(new_acc, 250);
    }

}