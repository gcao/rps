// import IComputerPlayer from "./IComputerPlayer";
// import GameState from "../GameState";
// import Prediction from "./Prediction";
// import Move from "../Move";

// export default class AnotherPlayer implements IComputerPlayer {
//   constructor() {
//   }

//   predict(state: GameState): Prediction {
//     throw new Error("Method not implemented.");
//   }

//   train(state: GameState, move: Move) {
//     throw new Error("Method not implemented.");
//   }
// }

const CHOICES = ["R", "P", "S"]
const RNA={'RR':'1','RP':'2','RS':'3','PR':'4','PP':'5','PS':'6','SR':'7','SP':'8','SS':'9'}
const mix={'RR':'R','RP':'R','RS':'S','PR':'R','PP':'P','PS':'P','SR':'S','SP':'P','SS':'S'}
const rot={'R':'P','P':'S','S':'R'}

let DNA=["", "", ""]
let prin=[]
for (var i=0; i<18; i++) {
  prin[i] = randMove()
}
let meta=[]
for (var i=0; i<6; i++) {
  meta[i] = randMove()
}
let skor1=[]
for (var i=0; i<6; i++) {
  skor1[i] = [];
  for (var j=0; j<18; j++) {
    skor1[i][j] = 0;
  }
}
let skor2=[]
for (var i=0; i<6; i++) {
  skor2[i] = 0
}
let output

function play(input) {
  for(var j=0; j<18; j++) {
    for(var i=0; i<4; i++) {
      skor1[i][j]*=0.8
    }
    for(var i=4; i<6; i++) {
      skor1[i][j]*=0.5
    }
    for(var i=0; i<6; i+=2) {
      skor1[i][j]-=(input==rot[rot[prin[j]]])
      skor1[i+1][j]-=(output==rot[rot[prin[j]]])
    }
    for(var i=2; i<6; i+=2) {
      skor1[i][j]+=(input==prin[j])
      skor1[i+1][j]+=(output==prin[j])
    }
    skor1[0][j]+=1.3*(input==prin[j])-0.3*(input==rot[prin[j]])
    skor1[1][j]+=1.3*(output==prin[j])-0.3*(output==rot[prin[j]])
  }
  for(var i=0; i<6; i++) {
    skor2[i]=0.9*skor2[i]+(input==meta[i])-(input==rot[rot[meta[i]]])
  }
  DNA[0]+=input
  DNA[1]+=output
  DNA[2]+=RNA[input+output]
  for(var i=0; i<3; i++) {
    j=Math.min(21,DNA[2].length)
    k=-1
    let s = DNA[i]
    while (j>1 && k<0) {
      j-=1

      // k=DNA[i].rfind(DNA[i][-j:],0,-1)
      let substr = s.substring(s.length - j)
      k=s.lastIndexOf(substr)
    }
    prin[2*i]=DNA[0][j+k]
    prin[2*i+1]=rot[DNA[1][j+k]]

    // k=DNA[i].rfind(DNA[i][-j:],0,j+k-1)
    let substr = s.substring(s.length - j)
    k=s.slice(0, j+k-1).lastIndexOf(substr)

    prin[2*i]=mix[prin[2*i]+DNA[0][j+k]]
    prin[2*i+1]=mix[prin[2*i+1]+rot[DNA[1][j+k]]]
  }
  for (var i=6; i<18; i++) {
    prin[i]=rot[prin[i-6]]
  }
  for (var i=0; i<6; i+= 2) {
    meta[i]=prin[skor1[i].indexOf(Math.max(...skor1[i]))]
    meta[i+1]=rot[prin[skor1[i+1].indexOf(Math.max(...skor1[i+1]))]]
  }

  output = rot[meta[skor2.indexOf(Math.max(...skor2))]]
  return output
}

function randMove() {
  return CHOICES[Math.floor(Math.random() * 3)]
}
