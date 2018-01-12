var board, x, y, clicks, array, cnt, x2 = -1, y2 = -1;

function start() {
    Knopf();
    Board();
    restart();
}
function Knopf() {
    var b, d = document.createElement( "div" );
    d.className += "board";
    document.body.appendChild( d );
    for( var j = 0; j < 4; j++ ) {
        for( var i = 0; i < 4; i++ ) {
            b = document.createElement( "button" );
            b.id = "btn" + ( i + j * 4 );
            b.i = i; b.j = j;
            b.addEventListener( "click", game, false );
            b.appendChild( document.createTextNode( "" ) );
            d.appendChild( b );
        }
    }
    cnt = document.createElement( "p" );
    cnt.className += "txt";
    document.body.appendChild( cnt );
}
function Board() {
    board = new Array( 4 );
    for( var i = 0; i < 4; i++ ) {
        board[i] = new Array( 4 );
    }
    for( var j = 0; j < 4; j++ ) {
        for( var i = 0; i < 4; i++ ) {
            board[i][j] = ( i + j * 4 ) + 1;
        }
    }
    x = y = 3; board[x][y] = 16;
}

function restart() {
    shuffle();
    clicks = 0;
    update();
}
function shuffle() {
    var v = 0, t; 
    do {
        getarray();
        while( true ) {
            t = array[Math.floor( Math.random() * array.length )];
            console.log( t.x, x2, t.y, y2 )
            if( t.x != x2 || t.y != y2 ) break;
        }
        x2 = x; y2 = y;
        board[x][y] = board[t.x][t.y];
        x = t.x; y = t.y;
        board[x][y] = 16; 
    } while( ++v < 200 );
}
function getarray() {
    var x3, y3, cx = [-1, 0, 1, 0], cy = [0, -1, 0, 1];
    array = [];
    for( var i = 0; i < 4; i++ ) {
        x3 = x + cx[i]; y3 = y + cy[i];
        if( x3 < 0 || x3 > 3 || y3 < 0 || y3 > 3 ) continue;
        array.push( { x: x3, y: y3 } );
    }
}
function update() {
    var b, v, id;
    for( var j = 0; j < 4; j++ ) {
        for( var i = 0; i < 4; i++ ) {
            id = "btn" + ( i + j * 4 );
            b = document.getElementById( id );
            v = board[i][j];
            if( v < 16 ) {
                b.innerHTML = ( "" + v );
                b.className = "button"
            }
            else {
                b.innerHTML = ( "" );
                b.className = "empty";
            }
        }
    }
    cnt.innerHTML = "Clicks: " + clicks;
}
function Ende() {
    var a = 0;
    for( var j = 0; j < 4; j++ ) {
        for( var i = 0; i < 4; i++ ) {
            if( board[i][j] < a ) return false;
            a = board[i][j];
        }
    }
    return true;
}
function game( e ) {
    getarray();
    var c = e.target.i, r = e.target.j, p = -1;
    for( var i = 0; i < array.length; i++ ) {
        if( array[i].x == c && array[i].y == r ) {
            p = i;
            break;
        }
    }
    if( p > -1 ) {
        clicks++;
        var t = array[p];
        board[x][y] = board[t.x][t.y];
        x = t.x; y = t.y;
        board[x][y] = 16;
        update();
        if( Ende() ) {
            setTimeout(function(){ 
                alert( "WELL DONE!" );
                restart();
            }, 1);
        }
    }
}
