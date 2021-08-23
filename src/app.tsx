import { Text, Window, hot, View, BoxView, Image, ScrollArea, Button, PlainTextEdit, LineEdit, useEventHandler } from "@nodegui/react-nodegui";
import React, { useState, useEffect } from "react";
import { QPushButtonSignals, QIcon, QSize } from "@nodegui/nodegui";
import freechains_logo from "../assets/logo.png";

const freechains = require("./freechains.js").freechains;
const fc = freechains({});


const minSize = { width: 950, height: 500 };
const winIcon = new QIcon(freechains_logo);
const freechains_i = new QIcon(freechains_logo);
const colorScheme = ["#400150", "#5C0272", "#4E0161", "#31013D", "#210029"];

const sidePanelStyle = `
    background-color: `+colorScheme[4]+`;
    color: `+colorScheme[4]+`;
    padding-top: 0px;
    margin: 0px;
`;

const buttonStyle = `
                height: 80px;
                width: 70px;
                border-radius: 90px;
                margin-top: 10px;
                padding-left: 5px;
                padding-right: 5px;
                background-color: #fff;
    `;

const buttonIconSize = new QSize(70, 70);

function ButtonWithImage(){
    return (<Button style={buttonStyle} icon={winIcon} iconSize={buttonIconSize}/>)
};

function SidePanel(props: any){
  const [chainList, setChainList] = useState<string>("");
  fc("chains list", setChainList);
    return (
      <View style={`
        width: ` + (props.showSidePanel && '75' || '0') + `px;
        flex-direction: column;
      `}
      visible={props.showSidePanel}
      >
    <ScrollArea id="sidePanel" style={sidePanelStyle+`
        flex-direction: row;
        flex: 1;
        width: 75px;
    `}>
    <View style={sidePanelStyle+`
    height: 300px;
    width: 70px;
    `}>
    <Image key="freechains_icon" id="freechains_icon" src={freechains_logo} style="height:95px; width:70px; border-radius:90px; padding-top: 35px; padding-left:5px; padding-right:5px;" />
    {chainList.split(" ").map((s, i)=><Button text={s} key={i} on={{clicked: ()=>props.changeChain(s)}}/>)}
    </View>
    </ScrollArea>
    </View>
    );
};

function MainPanel(props: any){
  const [blockHashes, setblockHashes] = useState<string>("");
  fc("chain "+props.chainName+" traverse \"\"", setblockHashes);
  const [feed, setFeed] = useState<Array<string>>([""]);
  const loadFeed = function(hash: string){
    fc("chain "+props.chainName+" get payload "+hash+" []", function(content: string){
      setFeed([...feed, content]);
    })
  }
  return (
    <View id="remainder" style={mainPanelStyle}>
    <Text style="qproperty-alignment: AlignCenter;">Freechains Gui Client</Text>
    {feed.map((content, i)=>
      <Text key={i}>{content}</Text>
    )}
    {blockHashes.split(" ").map((s, i)=><Button text={s} key={i} on={
      {clicked: ()=>loadFeed(s)}
    }/>)}
    <PlainTextEdit></PlainTextEdit>
    </View>
  )
}

const mainPanelStyle = `
    flex: 1;
    background-color: `+colorScheme[3]+`;
    flex-direction: column;
`;

function Main(){
  const [showSidePanel, setSidePanel] = useState<boolean>(true);
  const toggleSidePanel = function(){
    setSidePanel(!showSidePanel);
  }
  const [chainName, changeChain] = useState<string>("#");
  return (
    <Window
      windowIcon={winIcon}
      windowTitle="Testing features"
      minSize={minSize}
    >
      <View id="rootView" style={containerStyle}>
          <SidePanel showSidePanel={showSidePanel} changeChain={changeChain}/>
          <MainPanel chainName={chainName}/>
          <Button text={showSidePanel && "<" || ">"} on={{clicked: toggleSidePanel}}/>
          {/*<LineEdit on={{ textChanged: (txt)=>setTxt(txt)}}/>
          <Button text={"Hello World"} style={buttonStyle} on={{clicked: updateList}}/>
          */}
      </View>
    </Window>
  );
}

class App extends React.Component {
  render() {
    return (<Main/>
    );;
  }
}

const containerStyle = `
  flex-direction: row;
`;

export default hot(App);
