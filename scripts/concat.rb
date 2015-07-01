
if ARGV[0] != nil and File.directory?(ARGV[0])

  dir     = ARGV[0]
  outpath = (ARGV[1] == nil ? 'out.txt' : ARGV[1]) 
  if File.file?(outpath)
    File.delete(outpath)
  end

  Dir.foreach(dir) do |item|
    next if item == '.' or item == '..'
    inpath = File.join(dir, item);
    number = item[4..5]
    nv = item[7..8]
    if nv[1] == '.'
      nv = nv[0]
    end
    content = number + "\n" + nv + "\n"
    text = File.open(inpath, 'r')
    text.each_line do |line|
      content += line
    end
    File.open(outpath, 'a') { |file| file.write(content) }
  end
end

