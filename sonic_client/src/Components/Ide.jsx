import React, { useContext, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button, FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestoreIcon from "@mui/icons-material/Restore";
import { ColorModeContext } from "../App";

const defaultIdeLangState = new Map([
    ["c", '#include <stdio.h>\n\nint main()\n{\n    printf("Hello\\n");\n}'],
    [
        "cpp",
        '#include <iostream>\n\nusing namespace std;\n\nint main()\n{\n    cout << "Hello" << "\\n";\n}',
    ],
    [
        "java",
        '// PLEASE DON\'T CHANGE THE CLASS NAME!\nclass Test\n{\n    public static void main(String[] args)\n    {\n        System.out.println("Hello");\n    }\n}',
    ],
    ["python", 'print("Hello")'],
    ["javascript", 'console.log("Hello");'],
]);

const Ide = (props) => {
    const [language, setLanguage] = useState("c");
    const [theme, setTheme] = useState("vs-dark");
    const colorMode = useContext(ColorModeContext);
    const [ideLangState, setIdeLangState] = useState(new Map(defaultIdeLangState));
    const handleEditorChange = (value, event) =>
        setIdeLangState(new Map(ideLangState.set(language, value || "")));
    // loader.config({ paths: { vs: "/min/vs/loader.js" } });

    // change global theme according to the IDE theme
    useEffect(() => colorMode.setColorMode(theme === "light"? "light":"dark"), [theme, colorMode]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: props.ideWidth || "60%",
                gap: "1rem",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    gap: "1rem",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <FormControl size="small">
                        <InputLabel id="sel-lang">Language</InputLabel>
                        <Select
                            labelId="sel-lang"
                            value={language}
                            label="Language"
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <MenuItem value="c">C</MenuItem>
                            <MenuItem value="cpp">C++</MenuItem>
                            <MenuItem value="java">JAVA</MenuItem>
                            <MenuItem value="python">Python3</MenuItem>
                            <MenuItem value="javascript">Javascript</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small">
                        <InputLabel id="sel-theme">Theme</InputLabel>
                        <Select
                            labelId="sel-theme"
                            value={theme}
                            label="Theme"
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            <MenuItem value="light">light</MenuItem>
                            <MenuItem value="vs-dark">vs-dark</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        disabled={props.compiling}
                        onClick={async () => {
                            props.runCompileFunc(language, ideLangState.get(language) || "");
                        }}
                        endIcon={!props.compiling && <PlayArrowIcon />}
                    >
                        {props.compiling ? <CircularProgress size="1.5rem" /> : "Compile and run"}
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                            setIdeLangState(
                                new Map(
                                    ideLangState.set(
                                        language,
                                        defaultIdeLangState.get(language) || ""
                                    )
                                )
                            )
                        }
                        endIcon={<RestoreIcon />}
                    >
                        Reset code
                    </Button>
                </div>
            </div>

            {/* TODO: editor with rounded corners (to be consistent with mui) */}
            <Editor
                language={language}
                theme={theme}
                value={ideLangState.get(language)}
                onChange={handleEditorChange}
            />

            <Button variant="contained" color="success" endIcon={<PlayArrowIcon />}>
                Save and next
            </Button>
        </div>
    );
};

export default Ide;
