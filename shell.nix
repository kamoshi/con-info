{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
	packages = with pkgs; [
		nodejs
		nodePackages.pnpm
	];
}
