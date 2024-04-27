```sh
     ██████╗ ███████╗  ██████╗  ███╗   ██╗ ████████╗ ███████╗
    ██╔════╝ ██╔════╝ ██╔═══██╗ ████╗  ██║ ╚══██╔══╝ ██╔════╝
    ██║      █████╗   ██║   ██║ ██╔██╗ ██║    ██║    ███████╗
    ██║      ██╔══╝   ██║   ██║ ██║╚██╗██║    ██║    ╚════██║    ╦═╗ ╦ ╦ ╔═╗ ╔╦╗
    ╚██████╗ ██║      ╚██████╔╝ ██║ ╚████║    ██║    ███████║    ╠╦╝ ║ ║ ╚═╗  ║
     ╚═════╝ ╚═╝       ╚═════╝  ╚═╝  ╚═══╝    ╚═╝    ╚══════╝    ╩╚═ ╚═╝ ╚═╝  ╩
```

![cfont styles](https://raw.githubusercontent.com/dominikwilkowski/cfonts/released/img/example1.png)

<p align="center"><img src="https://raw.githubusercontent.com/dominikwilkowski/cfonts/released/img/example2.png" alt="api example"></p>
<p align="center">
	<a href="https://crates.io/crates/cfonts"><img src="https://img.shields.io/crates/v/cfonts.svg" alt="crates badge"></a>
	<a href="https://crates.io/crates/cfonts"><img src="https://docs.rs/cfonts/badge.svg" alt="crates docs tests"></a>
	<a href="https://github.com/dominikwilkowski/cfonts/actions/workflows/testing.yml"><img src="https://github.com/dominikwilkowski/cfonts/actions/workflows/testing.yml/badge.svg" alt="build status"></a>
</p>

<p align="center">This is a silly little command line tool for sexy ANSI fonts in the console. <strong>Give your cli some love.</strong></p>

**Read the [docs over at docs.rs](https://docs.rs/cfonts/).**

## Installing

### [homebrew](https://formulae.brew.sh/formula/cfonts)

```sh
brew install cfonts
```

### [Arch User Repository](https://aur.archlinux.org/packages/cfonts)

```sh
sudo pacman -S cfonts
```

### [MacPorts](https://ports.macports.org/port/cfonts/)

```sh
sudo port install cfonts
```

### [cargo](https://crates.io/crates/cfonts)

```sh
cargo install cfonts
```

To use it in your shell:

```sh
$ cfonts "Hello|World\!"
```

_💡  Remember to escape the `!` character with `\` in most shells_

Or use it in your project:

```toml
[dependencies]
cfonts = "1"
```

```rust
extern crate cfonts;

use cfonts::{ say, Options, Align, BgColors, Colors, Env, Fonts, Rgb };

fn main() {
	say(Options {
		text: String::from("Hi there"),
		font: Fonts::FontBlock,
		colors: vec![Colors::System],
		background: BgColors::Transparent,
		align: Align::Left,
		letter_spacing: 1,
		line_height: 1,
		spaceless: false,
		max_length: 0,
		gradient: Vec::new(),
		independent_gradient: false,
		transition_gradient: false,
		env: Env::Cli,
		..Options::default()
	});
}
```

_All settings are optional and shown here with their default_

You can use `cfonts` in your project without the direct output to the console:

```rust
extern crate cfonts;

use cfonts::{ render, Options, Fonts };

fn main() {
	let output = render(Options {
		text: String::from("hello"),
		font: Fonts::FontTiny,
		..Options::default()
	});

	assert_eq!(
		output.text,
		format!("{}{}{}",
			"\n\n",
			" █ █ █▀▀ █   █   █▀█\n",
			" █▀█ ██▄ █▄▄ █▄▄ █▄█\n\n"
		)
	);

	assert_eq!(output.vec, vec![
		String::from("\n\n █ █ █▀▀ █   █   █▀█"),
		String::from(    " █▀█ ██▄ █▄▄ █▄▄ █▄█"),
		String::from("\n"),
	]);

	assert_eq!(output.lines, 1);

	assert_eq!(output.options, Options {
		text: String::from("hello"),
		font: Fonts::FontTiny,
		..Options::default()
	});
}
```


## CLI Usage

Read more in the [root repo](https://github.com/dominikwilkowski/cfonts).


## Tests

All tests are run on the below platforms with our [CI](https://github.com/dominikwilkowski/cfonts/tree/released/.github/workflows/testing.yml).

| Platform |
|----------|
| Linux    |
| MacOS    |
| Windows  |

### Unit tests

There are some [unit tests and integration tests](https://github.com/dominikwilkowski/cfonts/blob/released/rust/tests) within the `tests` folder.

We also have an [end-to-end test script](https://github.com/dominikwilkowski/cfonts/blob/released/rust/tests/end-to-end_test.rs) setup that runs on the binaries (on all platforms) and compares its output against fixtures and the output of the node implementation.

## Release History

* 1.1.4  -  Fixed lock file
* 1.1.3  -  Fixed #75, bumped dependencies and fixed some clippy warnings
* 1.1.2  -  Added `LICENSE` into the published version
* 1.1.1  -  Updated dependencies, bumped `terminal_size` to `0.2.3`
* 1.1.0  -  Added `yellow` to the gradient colors
* 1.0.4  -  Fixed NO_COLOR not being respected in help, fixed color conversion rgb to ansi_256
* 1.0.3  -  Fixed NO_COLOR support when run without FORCE_COLOR
* 1.0.2  -  Fixed help and version flags in first position
* 1.0.1  -  Fixed font loading
* 1.0.0  -  Public release of rust API
* 0.1.0  -  Alpha test


## License

Copyleft (c) 2023 Dominik Wilkowski.
Licensed under the [GNU GPL-3.0-or-later](https://github.com/dominikwilkowski/cfonts/blob/released/LICENSE).
