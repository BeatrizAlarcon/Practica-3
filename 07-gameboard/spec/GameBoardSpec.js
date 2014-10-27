/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colecci�n de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se a�aden como tableros independientes para que Game pueda
  ejecutar sus m�todos step() y draw() peri�dicamente desde su m�todo
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre s�. Aunque se a�adiesen nuevos tableros para los
  misiles y para los enemigos, resulta dif�cil con esta arquitectura
  pensar en c�mo podr�a por ejemplo detectarse la colisi�n de una nave
  enemiga con la nave del jugador, o c�mo podr�a detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: dise�ar e implementar un mecanismo que permita gestionar
  la interacci�n entre los elementos del juego. Para ello se dise�ar�
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego ser�n las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard ser� un board m�s, por lo que deber� ofrecer los
  m�todos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos m�todos.

  Este prototipo no a�ade funcionalidad nueva a la que ofrec�a el
  prototipo 06.


  Especificaci�n: GameBoard debe

  - mantener una colecci�n a la que se pueden a�adir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosi�n, etc.

  - interacci�n con Game: cuando Game llame a los m�todos step() y
    draw() de un GameBoard que haya sido a�adido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los m�todos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisi�n entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deber�n
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cu�ndo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qu� tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto s�lo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/
describe("Clase GameBoard", function(){
  it("Gameboard.add", function() {

    var gameBoard = new GameBoard();

    //espero que lo que devuelva sea el objeto introducido
    expect(gameBoard.add(1)).toEqual(1);
    expect(gameBoard.add(2)).toEqual(2);

    //espero que se haya a�adido el objeto introducido
    expect(gameBoard.objects[0]).toEqual[1];
    expect(gameBoard.objects[1]).toEqual[2];
  });

  it("Gameboard.remove", function(){
    var gameBoard = new GameBoard();
    //comprubebo que se llama a resetRemoved
    spyOn(gameBoard, "resetRemoved").andCallThrough();
    gameBoard.resetRemoved();
    expect(gameBoard.resetRemoved).toHaveBeenCalled();
    //compruebo que elimina
    gameBoard.add(1);
    gameBoard.add(8);
    gameBoard.remove(8);
    gameBoard.remove(1);
    expect(gameBoard.removed[0]).toEqual(8);
    expect(gameBoard.removed[1]).toEqual(1);
  });

  it("Gameboard.resetRemoved", function(){
    var gameBoard = new GameBoard();
    expect(gameBoard.resetRemoved()).toEqual();
  });

  it("Gameboard.finalizeRemoved",function(){
    var gameBoard = new GameBoard();

    //comprubebo que se llama a resetRemoved
    spyOn(gameBoard, "resetRemoved").andCallThrough();
    gameBoard.resetRemoved();
    expect(gameBoard.resetRemoved).toHaveBeenCalled();

    gameBoard.add(1);
    gameBoard.add(8);
    expect(gameBoard.objects[0]).toEqual(1);
    expect(gameBoard.objects[1]).toEqual(8);
    gameBoard.remove(8);
    expect(gameBoard.removed[0]).toEqual(8);
    expect(gameBoard.objects[0]).toEqual(1);
    expect(gameBoard.objects[1]).toEqual(8);

    gameBoard.finalizeRemoved();
    expect(gameBoard.removed[0]).toEqual(8);
    expect(gameBoard.objects[0]).toEqual(1);
    expect(gameBoard.objects[1]).toEqual(undefined);

    gameBoard.remove(1);
    expect(gameBoard.removed[1]).toEqual(1);

    gameBoard.finalizeRemoved();
    expect(gameBoard.objects[0]).toEqual(undefined);
    expect(gameBoard.objects[1]).toEqual(undefined);
  });
});




