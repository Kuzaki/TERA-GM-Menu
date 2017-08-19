module.exports = function EnableGM(dispatch) {
        
    let cid, player;

    dispatch.hook('S_LOGIN', 2, (event) => {
        cid = event.cid;
        player = event.name;
		dispatch.toServer('C_ADMIN', 1, { enabled: 1 })
    });

    dispatch.hook('C_WHISPER', 1, (event) => {
        if(event.target.toUpperCase() === "!gm".toUpperCase()) {
            if (/^<FONT>on?<\/FONT>$/i.test(event.message)) {
                dispatch.toClient('S_QA_SET_ADMIN_LEVEL', 1, { enabled: 1 })
				dispatch.toServer('C_ADMIN', 1, { enabled: 1 })
				dispatch.toClient('S_ADMIN_PRIVILEGE', 1, { enabled: 1 })
				dispatch.toClient('S_ADMIN_GET_USER_INFO_LIST_BY_DISTANCE', 1, { enabled: 1 })
                message('GM Menu <font color="#E69F00">Enabled</font>.')
            }
            else if (/^<FONT>off?<\/FONT>$/i.test(event.message)) {
                dispatch.toClient('S_QA_SET_ADMIN_LEVEL', 1, { enabled: 0 })
				dispatch.toClient('S_ADMIN_PRIVILEGE', 1, { enabled: 0 })
				dispatch.toServer('C_ADMIN', 1, { enabled: 0 })
                message('GM Menu <font color="#E69F00">Disabled</font>.')
            }
            else message('Commands:<br>'
                                + ' "on" (Enable GM Menu),<br>'
                                + ' "off" (Disable GM Menu)'
                        )
            return false
        }
    });
    
    function message(msg) {
        dispatch.toClient('S_WHISPER', 1, {
            player: cid,
            unk1: 0,
            gm: 1,
            unk2: 0,
            author: 'Memeboy',
            recipient: player,
            message: msg
        })
    }
}
