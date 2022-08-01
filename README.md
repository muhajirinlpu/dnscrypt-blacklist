DNSCRYPT BLACKLIST
---

### Run 
```shell
$ deno run --allow-net --allow-write generate.ts
```

### Download generated file
1. go to [action page](https://github.com/muhajirinlpu/dnscrypt-blacklist/actions/workflows/generate.yaml) for this repository.
2. select latest workflow, please log in before continue to next step.
   > [](art/ss-1.png)
3. click on artifact file
   > [](art/ss-2.png)
4. extract file 
5. put `blocked_names.txt` to same folder where `dnscrypt-proxy.toml` is located.
6. modify `dnscrypt-proxy.toml` on blocked_names section
   ```toml
   [blocked_names]
     blocked_names_file = '/etc/dnscrypt-proxy/blocked_names.txt'
   ```