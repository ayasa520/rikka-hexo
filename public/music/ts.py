import functools
import argparse
import os.path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-file", dest = "setup_14.x")
    args = parser.parse_args()
    fileName = 'setup_14.x'
    assert fileName and os.path.exists(fileName), "file not found"

    with open(fileName, "rb") as f:
        data = bytearray(os.path.getsize(fileName))
        f.readinto(data)
        # print(data)
        data = data.replace(b"\r\n", b"\n")

    with open(fileName, "wb") as f:
        # print(data)
        f.write(data)


if __name__ == "__main__":
    main()
