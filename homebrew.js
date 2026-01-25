async function main() {
    const CWD = window.workingDir;
    const PAYLOAD = CWD + '/unrar.elf';
    let TARGET_PATH = '/data/psapp';

    return {
        mainText: 'UnRAR',
        secondaryText: 'By SunnyQeen',
        onclick: async () => {
            const file = await pickFile('', 'Select rar flle...');
            if (file) {
                showCarousel([
                    {
                        mainText: "Unpack to",
                        secondaryText: TARGET_PATH,
                        onclick: async () => {
                            return {
                                path: PAYLOAD,
                                cwd: CWD,
                                args: [PAYLOAD, 'x', '-y', '-p-', '-o+', file, TARGET_PATH],
                                daemon: true,
                            };
                        }
                    },
                    {
                        mainText: "List content of",
                        secondaryText: file,
                        onclick: async () => {
                            return {
                                path: PAYLOAD,
                                cwd: CWD,
                                args: [PAYLOAD, 'l', '-y', '-p-', file],
                                daemon: true,
                            };
                        }
                    }
                ]);
            }
        },
        options: [
            {
                text: "Show TargetDir",
                onclick: async () => {
                    showCarousel([
                        {
                            mainText: "TargetDir",
                            secondaryText: TARGET_PATH,
                            onclick: async () => {
                                history.back();
                            }
                        }
                    ]);
                }
            },
            {
                text: "Change TargetDir",
                onclick: async () => {
                    const dir = await pickDirectory('', 'Select Target Directory...');
                    if (dir) {
                        TARGET_PATH = dir;
                        history.back();
                    }
                }
            }
        ]
    };
}
