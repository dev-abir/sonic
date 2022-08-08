import React, { useState } from "react";
import Ide from "../Components/Ide";
import QuestionResult from "../Components/QuestionResult";
import SideNav from "../Components/SideNav";
import { Resizable } from "re-resizable";
import { Divider, CssBaseline } from "@mui/material";

// "Playground" where the actual game is played
function Playground(props) {
    const [ideWidth, setIdeWidth] = useState();
    const [compiling, setCompiling] = useState(false);

    // how much complex can be monaco resize?
    const getPxFromRem = (rem) =>
        rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const onResize = (width) =>
        setIdeWidth(
            Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) -
                width +
                // somehow this rem offset is coming
                // maybe from gaps, or resizableHandler...?
                getPxFromRem(-1.5)
        );

    const runCompile = async (language, src) => {
        setCompiling(true);
        console.log(await window.vroomAPI.saveProgram(src, language));
        console.log(await window.vroomAPI.compileInterprete());
        setCompiling(false);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                padding: ".5rem",
                height: "calc(100vh - 1rem)",
                width: "calc(100vw - 1rem)",
                gap: "1rem",
            }}
        >
            {/* CssBaseline provides a proper dark/light background */}
            <CssBaseline />

            <SideNav />

            <Resizable
                defaultSize={{
                    width: "40%",
                    height: "100%",
                }}
                minWidth="15%"
                maxWidth="60%"
                handleComponent={{
                    right: <Divider orientation="vertical" />,
                }}
                handleStyles={{
                    right: {
                        width: "1rem",
                        right: "-.5rem",
                    },
                }}
                enable={{
                    top: false,
                    right: true,
                    bottom: false,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                }}
                onResize={(e, dir, refToElement) =>
                    onResize(refToElement.getBoundingClientRect().right)
                }
            >
                <QuestionResult />
            </Resizable>

            <Ide ideWidth={ideWidth} runCompileFunc={runCompile} compiling={compiling} />
        </div>
    );
}

export default Playground;
